const router = require('express').Router();
const fs = require('fs');
const Blog = require('../models/blog/blog');
const Apidata = require('../helperFiles/ApiData');

const slugify = require('slugify');

// post route for blogs
router.post('/', Apidata.uploadBlog, async(req, res) => {

    // const BlogExist = Blog.findOne({ name : req.body.name })

    // if (BlogExist) {
    //     // res.send("blog already exists")
    //     return ;
    // }

    // else {
        const dir = './media/blog/' + req.body.blogname
        const tempPath = './media/blog/' + req.file.filename
        const newPath = './media/blog/' + req.body.blogname + '/card-' + req.file.filename

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
            fs.mkdirSync(dir + '/content')
            fs.rename(tempPath, newPath, err => { 
                if (err) throw err;
                console.log("blog card moved")
             })
        }

        const slug = slugify(req.body.blogname, {lower: true});

        const blogItem = new Blog({
            name : req.body.blogname,
            author : req.body.author,
            instaid : req.body.instaid,
            desc : req.body.blogdesc,
            slug : slug,
            publishedOn : req.body.publishedOn,
            blogcardImg : req.file.filename,
            blogcardImgRoute : req.body.blogname + '/card-' + req.file.filename,
            blogBanner : req.file.filename,
            blogBannerRoute : "",
            blogCatchLine : "",
            blogSections : [
                {
                    sectionName : 'section-0',
                    content : "",
                    isImagePresent : false,
                    imgPosition : null,
                    image : "",
                }
            ]
    
        })
        const savedBlogItem = await blogItem.save()
        res.send(savedBlogItem)
        
        // return res.status(200).send(req.file)
    // }

    
    
});

//Get route for blogs
router.get('/', async(req, res) => {
    const all_blogs = await Blog.find({ })
    res.send( all_blogs )
});


module.exports = router;