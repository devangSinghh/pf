const express = require('express')
const router = express.Router()
const admin = require('../../models/auth')

router.get('/', async(req, res) => {
    if(!req.cookies.session_id && req.cookies.admin.length !== 0)
        await admin.findOneAndUpdate({ username : req.cookies.admin }, { session_id :'' })
    if (!req.cookies.session_id) return res.redirect('/login')
    var dataObject = {'title':'Home'}
    res.render('admin/home',{data: dataObject})
})

module.exports = router;