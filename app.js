//for reading environment variables
const dotenv = require('dotenv')
dotenv.config()

const express= require('express')
const path = require('path')

//create express app
const app= express()

//for cross browser access
const cors = require('cors')

//login system library
const passport = require('passport')

//to parse json data
const bodyParser = require('body-parser')


//database libraries
const mongoose = require('mongoose')

//models
const Blog = require('./models/blog/blog')

//routes
const project = require('./routes/addProject')
const blog = require('./routes/blog')
const devblog = require('./routes/devblog')
const editThisBlog = require('./routes/editThisBlog')
const blogRequest = require('./routes/showcaseBlogRequests')
const ip = require('./routes/ip')
const analytics = require('./routes/analytics')
const testRoute = require('./routes/test')
const sitemap = require("./routes/sitemap")
const admin = require('./routes/auth')

const nocache = require('nocache')

//Port
const PORT = 6161

let depth_limit = 2; //JSON parse depth 

let limit_depth = (obj, current_depth, limit) => {
    // traversing each key and then checking the depth
    for (const key in obj)
        if (obj[key] instanceof Object)
            if (current_depth + 1 === limit)
                obj[key] = "[object Object]"
            else limit_depth(obj[key], current_depth + 1, limit)
}

//middleware to prevent NoSql injection
// app.use((req, res, next) => {
//     limit_depth(req.body, 0, depth_limit);
//     next()
// })

//enable pre-flight
app.options('*', cors())

//Middlewaress
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//login system middleware
app.use(passport.initialize())
app.use(passport.session())
// app.use(cookie())

//routes
app.use('/add-project', project)
app.use('/add-blog', blog)
app.use('/devblog', devblog)
app.use('/update-blog', editThisBlog)
app.use('/showcase-blog-request', blogRequest)
app.use('/record-ip', ip)
app.use('/api', analytics)
app.use('/sitemap.xml', sitemap)
app.use('/auth', admin)


// connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is connected!"))

app.get('/add-project/:file_name', (req,res) => {
    res.sendFile(path.join(__dirname+"/media/project/"+req.params.file_name))
})
  
app.get('/blog/:blogname/:file_name', (req,res) => {
  res.sendFile(path.join(__dirname+"/media/blog/"+ req.params.blogname + '/' +req.params.file_name))
})
app.get('/devblog/:blogname/:file_name', (req,res) => {
  res.sendFile(path.join(__dirname+"/media/devblog/"+ req.params.blogname + '/' +req.params.file_name))
})

app.get('/blog/:slug', async(req, res) => {
  const thisBlog = await Blog.findOne({slug : req.params.slug})
  res.send(thisBlog)
})

app.use(express.static('client/build'))

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

// const root = require('path').join(__dirname, 'client', 'build')
// app.use(express.static(root));
// app.get("*", (req, res) => {
//     res.setHeader("cache-control", "no-cache")
//     res.sendFile('index.html', { root });
// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    // res.set("Cache-Control", "no-cache, no-store, must-revalidate") // HTTP 1.1.
    // res.setHeader("Expires", "0") // Proxies.
    next()
})
app.use(nocache())
  
app.listen(PORT, function() {
      console.log('server running on 6161')
}) 
   