const router = require('express').Router()
const fs = require('fs')
const DevBlog = require('../models/blog/devblog')
const Apidata = require('../helperFiles/ApiData')
const sanitize = require('mongo-sanitize')
const slugify = require('slugify')

// post route for dev blogs
router.post('/', Apidata.uploadDevBlog, async(req, res) => {
    // const BlogExist = DevBlog.findOne({ name : req.body.name })

    // if (BlogExist) {
    //     // res.send("blog already exists")
    //     return ;
    // }

    // else {
    const devblogname = sanitize(req.body.devblogtitle)

    const slug = slugify(devblogname, {lower: true})
    const dir = './media/devblog/' + slug
    const tempPath = './media/devblog/' + req.file.filename
    const newPath = './media/devblog/' + slug + '/card-' + req.file.filename
    const cardBanner = 'devblog/' + slug + '/card-' + req.file.filename
    fs.access(dir, e => {
        if(e) {
            fs.mkdir(dir, e => { console.log(e) })
            fs.mkdir(dir + '/content', e => { console.log(e) })
            fs.rename(tempPath, newPath, err => { 
                if (err) throw err
            })
        }
    })   

    const blogItem = new DevBlog({
        name : devblogname,
        author : req.body.author,
        content : req.body.content,
        cardtitle : req.body.devblogtitle,
        cardBanner : cardBanner,
        publishedOn : req.body.publishedOn,
        blogBanner : "",
        title : "",
        body : "",
        slug : slug
    })

    const savedBlogItem = await blogItem.save()
    res.send(savedBlogItem)
})


//Get route for project items
router.get('/', async(req, res) => {
    const all_blogs = await DevBlog.find({ })
    const dataObj = { 'title':"blogs", 'blogs':all_blogs }
    res.render('admin/routes/blogs', { 'data' : dataObj })
})

router.get('/get', async(req, res) => {
    const all_blogs = await DevBlog.find({ })
    res.send(all_blogs)
})
router.get('/get/:slug', async(req, res) => {
    const data = await DevBlog.findOne({slug: sanitize(req.params.slug) })
    res.status(200).send(data)
})

router.post('/:id', Apidata.uploadDevBlog, async(req, res) => {
    
    const devblogname = sanitize(req.body.devblogtitle)
    const author = sanitize(req.body.author)

    const slug = slugify(devblogname, {lower: true})

    if(req.file) {
        const dir = './media/devblog/' + slug
        const tempPath = './media/devblog/' + req.file.filename
        const newPath = './media/devblog/' + slug + '/card-' + req.file.filename

        const cardBanner = 'devblog/' + slug + '/card-' + req.file.filename
        fs.readdir(dir, (e, data) => {
            if(e) return
            if (data.filter(m => m.includes('card')).length == 0) {
                fs.rename(tempPath, newPath, err => { 
                    if (err) throw err
                    console.log("card image moved")
                })
            }
            else {
                const oldFile = dir + '/' +  data.filter(m => m.includes('card'))[0]
                fs.unlink(oldFile, err => {
                    if (err) console.log(err)
                    console.log("root file deleted!!")
                })
    
                // fs.rename(tempPath, newPath, err => { 
                //     if (err) console.log("file dosen't exists")
                //     console.log("card image updated!!")
                //  })
        }

    })
        if (fs.existsSync(dir)) {
            fs.rename(tempPath, newPath, err => { 
                if (err) throw err;
            })
        } 

        const data = await DevBlog.findByIdAndUpdate(req.params.id, { name : devblogname, cardBanner : cardBanner, author : author })
    } 
    else {
        const data = await DevBlog.findByIdAndUpdate(req.params.id, { name : req.body.name, author : author })
    }
    res.status(200)
    res.redirect('back')
})

router.post('/banner/:name', Apidata.uploadDevBlog, async(req, res) => {

    const tempPath = './media/devblog/' + req.file.filename
    const newPath = './media/devblog/' + req.params.name + '/banner-' + req.file.filename
    fs.readdir('./media/devblog/' + req.params.name, (err, data) => {
        if(err) return
        if (data.filter(m => m.includes('banner')).length == 0) {
            fs.rename(tempPath, newPath, err => { 
                if (err) throw err
                console.log("banner image moved")
             })
        }
        else {
            fs.readdir('./media/devblog/' + req.params.name, (err, data) => {
                if(err) return
                else {
                    const oldFile = './media/devblog/' + req.params.name + '/' +  data.filter(m => m.includes('banner'))[0]
                    fs.unlink(oldFile, err => {
                        if (err) console.log(err)
                        console.log("root file deleted")
                    })
            
                    fs.rename(tempPath, newPath, err => { 
                        if (err) throw err;
                        console.log("banner image moved")
                     })
                }
            })

        }
    })

    const data = await DevBlog.findOneAndUpdate({slug : req.params.name}, { blogBanner : 'devblog/' + req.params.name + '/banner-' + req.file.filename })
    res.send(data)
})

//save editor content
router.post('/content/:id', async(req, res) => {
    await DevBlog.findByIdAndUpdate({'_id' : req.params.id }, { body : req.body.blogEditorContent })
})

router.post('/update-title/:id', async(req, res) => {
    const data = await DevBlog.findByIdAndUpdate(req.params.id, { title : req.body.title })
    res.send(data)
})
router.post('/update-subtitle/:id', async(req, res) => {
    const data = await DevBlog.findByIdAndUpdate(req.params.id, { subtitle : req.body.subtitle })
    res.send(data)
})

router.get('/:id', async(req, res) => {
    const data = await DevBlog.findById(req.params.id)
    res.send({ "data" : { "modalTitle":"Edit blog", "modalSubmit":"Update", "blog":data } })
})

router.delete('/:id', async(req, res) => {
    const obj = await DevBlog.findByIdAndDelete(req.params.id)
    res.status(200).send('deleted blog!')
})

module.exports = router;