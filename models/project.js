const mongoose = require('mongoose');

//model for the add project form
const project = new mongoose.Schema({
    name : String,
    desc : String,
    link : String,
    slug : String,
    image:String
})



module.exports = mongoose.model('projects', project);