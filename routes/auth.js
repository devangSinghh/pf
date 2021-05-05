const mongoose = require('mongoose')
const admin = require('../models/auth')
const sessions = require('../models/sessions')
const Router = require('express').Router()

mongoose.set('useFindAndModify', false);

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

// Router.post('/login', async(req, res) => {
//     res.redirect(307, '/success')
//     // const data = await admin.findOne({ username : req.body.username, password : req.body.password })
//     // if (data) return res.redirect(307, '/success')
//     // res.send(data)
// })


Router.post('/validate-user-session/:user', async(req, res) => {
    const data = await admin.findOne({ username : req.params.user })
    res.send(data.session_id)
  })

Router.get('/', async(req, res) => {
    const data = await admin.find({})
    res.send(data)
})

module.exports = Router