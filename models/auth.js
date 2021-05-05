const mongoose = require('mongoose')

const admin =  mongoose.Schema ({
    username : String,
    password : String,
    session_id : String
})

module.exports = mongoose.model('admin', admin)