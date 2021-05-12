const router = require('express').Router()
const Blog = require('../models/blog/devblog')

router.get('/read-more', async(req, res) => {
    const all_blogs = await Blog.find({  })
    const blogs = []
    do {
        blogs[blogs.length] = all_blogs.splice(Math.floor(Math.random()*all_blogs.length), 1)[0]
    } while (blogs.length < 3)

    res.send(blogs)
})

module.exports = router