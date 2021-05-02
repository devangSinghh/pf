const mongoose = require('mongoose')

const admin =  mongoose.Schema ({
    username : String,
    password : String
})

module.exports = mongoose.model('admin', admin)