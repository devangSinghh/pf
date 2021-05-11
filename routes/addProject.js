const router = require('express').Router()
const Project = require('../models/project')
const Apidata = require('../helperFiles/ApiData')
const slugify = require('slugify')

// post route for project items
router.post('/', Apidata.uploadProject , async(req, res) => {
        const slug = slugify(req.body.name, {lower: true})
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
})


//Get route for project items
router.get('/', async(req, res) => {
    const all_projects = await Project.find({ })
    const dataObj = { 'title':"projects", 'projects':all_projects }
    res.render('admin/routes/projects', { 'data' : dataObj })
})

router.get('/get', async(req, res) => {
    const all_projects = await Project.find({ })
    res.send(all_projects)
})

router.post('/:id', async(req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, { name : req.body.name, desc : req.body.desc })
    res.redirect('back')
})

router.get('/:id', async(req, res) => {
    const project = await Project.findById(req.params.id)
    res.send({ "data" : { "modalTitle":"Edit project", "modalSubmit":"Update", "project":project } })
})

router.delete('/:id', async(req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id)

    res.status(200).send('deleted')
})
module.exports = router;