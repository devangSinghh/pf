const mongoose = require('mongoose');

const tags = new mongoose.Schema({
    name : String,
    slug : String
})

const devblog = new mongoose.Schema({
    name : String,
    author : String,
    content : String,
    cardtitle : String,
    blogBanner : String,
    cardBanner : String,
    blogBannerRoute : String,
    title : String,
    subtitle : String,
    body : String,
    publishedOn : String,
    slug : String,
    tags : [tags],
})

module.exports = mongoose.model('devblogs', devblog);