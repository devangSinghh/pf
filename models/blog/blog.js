const mongoose = require('mongoose');

const blogSection = new mongoose.Schema({
    sectionName : String,  //section name for eg. section-0, section-1 etc..
    content : String,      //blog text
    isImagePresent:String,
    imgPosition : String,  //top, left, right, bottom
    image : String,        //filename
})

//model for the add project form
const blog = new mongoose.Schema({
    name : String,
    author : String,
    instaid : String,
    desc : String,
    slug:String,
    publishedOn:String,
    blogcardImg : String,
    blogInitialLine : String,
    color : String,
    blogcardImgRoute : String,
    blogBanner : String,
    blogBannerRoute : String,
    blogCatchLine : String,
    catchLineColor : String,
    catchLineFontFamily : String,
    catchLineFontWeight : String,
    blogBackground : String,
    contentColor : String,
    blogEditorContent : String,
    maxParaNumber : Number,
    blogIp : String,
    blogSections : [blogSection]
})

module.exports = mongoose.model('blogs', blog);