const router = require('express').Router()
const recordIp = require('ipstack')
const IpRecord = require('../models/recordIp')
const https = require('https')
const ipstack = require('ipstackclient')
const IpStackClient = ipstack.create(process.env.IP_ACCESS_KEY, false);
router.get('/add', async(req, res) => {

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

    res.send(savedIpRecord)

})

router.get('/', async(req, res) => {
   const data = await IpRecord.find({  })
   res.send(data)
})


module.exports = router