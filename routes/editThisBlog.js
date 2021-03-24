const router = require('express').Router();
const fs = require('fs')
const Blog = require('../models/blog/blog');
const Apidata = require('../helperFiles/ApiData');
const slugify = require('slugify');

// post route for blogs
router.put('/:name', Apidata.uploadBlog , async(req, res) => {

    const tempPath = './media/blog/' + req.file.filename
    const newPath = './media/blog/' + req.params.name + '/banner-' + req.file.filename

    if (fs.readdirSync('./media/blog/' + req.params.name).filter(m => m.includes('banner')).length == 0) {
        fs.rename(tempPath, newPath, err => { 
            if (err) throw err;
            console.log("banner image moved")
         })
    }
    else {
        const oldFile = './media/blog/' + req.params.name + '/' + fs.readdirSync('./media/blog/' + req.params.name).filter(m => m.includes('banner'))[0]

        fs.unlink(oldFile, err => {
            if (err) console.log(err)
        })

        fs.rename(tempPath, newPath, err => { 
            if (err) throw err;
            console.log("banner image moved")
         })

    }
    const data = await Blog.findOneAndUpdate({ 'name' : {$in : [req.params.name]} }, { 'blogBanner' : {$in : [req.file.filename]}, 'blogBannerRoute' : {$in : ['blog/' + req.params.name + '/banner-' + req.file.filename]} })
    res.send(data)
});

//update catch line of blog
router.put('/:name/:blogCatchLine', async(req, res) => {
    const data = await Blog.findOneAndUpdate({ 'name' : {$in : [req.params.name]} }, { 'blogCatchLine' : {$in : [req.params.blogCatchLine]} })
    res.send(data)
})

//update blog sections
router.put('/section/:id/:section', async(req, res) => {
    const data = await Blog.updateOne({'blogSections.sectionName' : {$in : [req.params.section]} }, {'$set' : { 'blogSections.$.content' : {$in : [req.body.content]} } })
    res.send(data)
})

router.post('/thissection/:id', async(req, res) => {
    const data = await Blog.findByIdAndUpdate({'_id':{$in :[req.params.id]}}, 
        { $push : { 
                blogSections : { 
                    "sectionName" : req.body.name,
                    "content" : req.body.val,
                    "isImagePresent":false,
                    "imgPosition" : "",
                    "image" : "",
                }
            }
        }).exec()

     res.send(data)
})

router.post('/total-blog-sections/:id/:number', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { maxParaNumber : req.params.number })
})

//update catchLine color
router.post('/catchLine/:id', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { catchLineColor : req.body.color })
})

//update catchLine font family
router.post('/catchLineFont/:id', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { catchLineFontFamily : req.body.fontFamily })
})

//update catchLine font weight
router.post('/catchLineFontWeight/:id', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { catchLineFontWeight : req.body.fontWeight })
})

//update blog background color
router.post('/blogBackground/:id', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { blogBackground : req.body.blogBackground })
})

//update content color
router.post('/content/:id', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { contentColor : req.body.contentColor })
})


router.post('/upload-blog-content/:name', Apidata.uploadBlog, async(req, res) => {
    const tempPath = './media/blog/' + req.file.filename
    const newPath = './media/blog/' + req.params.name + '/' + req.file.filename
    console.log(tempPath)
    console.log(newPath)
    fs.rename(tempPath, newPath, err => { 
        if (err) throw err;
        console.log("content image moved")
     })
})

router.post('/delete-a-section/:id/:section', async(req, res) => {
    const data = await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, {
        $pull : {
            blogSections : {
                "sectionName" : req.params.section
            }
        }
    })

    res.send(data)
})

//save editor content
router.post('/save-editor-content/:id', async(req, res) => {
    await Blog.findByIdAndUpdate({'_id' : { $in : [req.params.id]} }, { blogEditorContent : req.body.blogEditorContent })
})

//Get route for blogs
router.get('/', async(req, res) => {
    const all_blogs = await Blog.find({ })
    res.send( all_blogs )
});


module.exports = router;