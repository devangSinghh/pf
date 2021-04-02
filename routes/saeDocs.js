const router = require('express').Router()
const Storage = require('../helperFiles/ApiData')

//imprt docs model
const Docs = require('../models/saeDocs')

router.post('/', Storage.uploadSAEDocs , async(req, res) => {
    console.log(req.file.originalname)
    const doc = new Docs ({
        name : req.file.originalname,
        path : 'docs/' + req.file.filename
    })

    const savedDoc = await doc.save()
    res.send(savedDoc)
})

router.get('/', async(req, res) => {
    const data = await Docs.find({ })
    res.send(data)
})

module.exports = router