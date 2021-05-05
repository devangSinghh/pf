const mongoose = require('mongoose')

const sessions = new mongoose.Schema({
    _id  : String,
    expires : Date,
    session : String
})

module.exports = mongoose.model('sessions', sessions)