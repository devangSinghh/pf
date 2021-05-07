const mongoose = require('mongoose')
const admin = require('../models/auth')
const sessions = require('../models/sessions')
const sanitize = require('mongo-sanitize')
const Router = require('express').Router()
const boxen = require('boxen')

mongoose.set('useFindAndModify', false)

Router.post('/register', async(req, res) => {

    const username = sanitize(req.body.username)

    const checkUser = await admin.find({ username : {$in : [username]} })

    try {
        if(checkUser !== null) {
            res.send(boxen('user already exists!! try different username', { borderColor :'yellow' }))
            return
        }
        const user = new admin({
            username : req.body.username,
            password : req.body.password
        })

        const savedadmin = await user.save()
        res.send(savedadmin)
    }
    catch (e) {
        console.log(boxen('not able to create a new user! try again later', { borderColor : 'red' }))
    }
    
})

Router.post('/validate-user-session/:user', async(req, res) => {
    let data
    const user = sanitize(req.params.user)
    try {
        data = await admin.findOne({ 'username' : {$in : [user]} })
        res.send(data.session_id)
    }
    catch(e) {
        console.log(boxen('data is became null', { borderColor : "red", padding:"1", }))
    }
    
  })

Router.get('/', async(req, res) => {

    const admin = sanitize(req.body.admin)

    try {
        const verify = await admin.findOne({ 'username' : { $in : [admin] } })
        if (verify !== null) {
            const data = await admin.find({})
            res.send(data)
        }
    }
    catch (e) {
        console.log(boxen('cannot reveal data ! valid admin not found', { borderColor : "red" }))
    }
})

module.exports = Router