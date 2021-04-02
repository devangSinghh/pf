const mongoose = require('mongoose')

const date= new Date;
const localedate= date.toLocaleDateString();

const docs = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    path : String,
    created_at:{ type:String, default:localedate}
})

module.exports = mongoose.model('docs', docs)