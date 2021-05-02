const admin = require('../models/auth')
const Router = require('express').Router()

Router.post('/register', async(req, res) => {

    const checkUser = await admin.find({ username : req.body.username })

    if(checkUser) {
        res.send("user already exists!! try different username")
        return ;
    }
    const user = new admin({
        username : req.body.username,
        password : req.body.password
    })

    const savedadmin = await user.save()
    res.send(savedadmin)
})

Router.post('/login', async(req, res) => {
    const data = await admin.findOne({ username : req.body.username, password : req.body.password })
    res.send(data)
})

Router.get('/', async(req, res) => {
    const data = await admin.find({})
    res.send(data)
})

module.exports = Router