const router = require('express').Router();
const BlogRequest = require('../models/blog/showcaseBlogRequests');

router.post('/', async(req, res) => {
    const blogRequest = new BlogRequest({
        name : req.body.name,
        email : req.body.email,
        blogCategory : req.body.blogCategory,
        instaid:req.body.instaid,
        query : req.body.query
    })

    const savedBlogRequest = await blogRequest.save();
    res.send(savedBlogRequest)
    res.redirect('/send-confirmation-mail')
})


router.get('/', async(req, res) => {
    const data = await blogRequest.find({ })
    res.send(data)
})


module.exports = router