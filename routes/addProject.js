const router = require('express').Router();
const Project = require('../models/project');
const Apidata = require('../helperFiles/ApiData');
const IpRecord = require('../models/recordIp')
const slugify = require('slugify');
const ipstack = require('ipstackclient')
const IpStackClient = ipstack.create(process.env.IP_ACCESS_KEY, false);
// post route for project items
router.post('/', Apidata.uploadProject , async(req, res) => {

        const slug = slugify(req.body.name, {lower: true});
        console.log(req.body)
        const projectItem = new Project({ 
            name:req.body.name,
            desc:req.body.desc,
            repo:req.body.repo,
            slug:slug,
            image:req.file.filename

        })
        const savedprojectItem = await projectItem.save()
        res.send(savedprojectItem)
        
        return res.status(200).send(req.file)
});

//Get route for project items
router.get('/', async(req, res) => {
    const all_projects = await Project.find({ })
    const lookup = await IpStackClient.requesterLookup()
    const iprecord = await new IpRecord({
        ip : lookup.ip,
        type : lookup.type,
        continent_name : lookup.continent_name,
        country_name : lookup.country_name,
        region_name : lookup.region_name,
        city : lookup.city,
        zip : lookup.zip,
        latitude : lookup.latitude,
        longitude : lookup.longitude,
        location_capital : lookup.location.capital,
        country_flag : lookup.location.country_flag,
    })

    const savedIpRecord = await iprecord.save()
    res.send( all_projects, savedIpRecord )
});


module.exports = router;