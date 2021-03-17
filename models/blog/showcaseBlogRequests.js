const mongoose = require('mongoose');

const blogShowCaseRequests = new mongoose.Schema({
    name : String,
    email : String,
    blogCategory : String,
    instaid:String,
    query : String
})

module.exports = mongoose.model('Blog Requests', blogShowCaseRequests);