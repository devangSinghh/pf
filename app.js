
const dotenv = require('dotenv')
dotenv.config()

//libraries
const express= require('express')
const path = require('path')
const app= express()

//disable X-powered-by header
app.disable('x-powered-by')

const rate_limit = require('express-rate-limit')
const xss = require('xss-clean')
const csrf = require('csurf')
const crypto = require('crypto')
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const body_parser = require('body-parser')
const boxen = require('boxen')
// const helmet = require('helmet')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const { v4 : uuidv4 } = require('uuid')
const nocache = require('nocache')
const sanitize = require('mongo-sanitize')
const fs = require('fs')

//models
const Blog = require('./models/blog/blog')
const adminModel = require('./models/auth')
const authModel = require('./models/auth')

//declare routes
const project = require('./routes/addProject')
const blog = require('./routes/blog')
const devblog = require('./routes/devblog')
const editThisBlog = require('./routes/editThisBlog')
const blogRequest = require('./routes/showcaseBlogRequests')
const ip = require('./routes/ip')
const analytics = require('./routes/analytics')
const sitemap = require("./routes/sitemap")
const admin = require('./routes/auth')

//Port
const PORT = 6161

let depth_limit = 2; //JSON parse depth 

let limit_depth = (obj, current_depth, limit) => {
    // traversing each key and then checking the depth
    for (const key in obj)
        if (obj[key] instanceof Object)
            if (current_depth + 1 === limit) {
              obj[key] = "[object Object]"
              console.log(boxen('external mongo injection suspected', { borderColor : 'red' }))
            }
                
            else limit_depth(obj[key], current_depth + 1, limit)
}

// middleware to prevent Mongo injection
app.use((req, res, next) => {
    limit_depth(req.body, 0, depth_limit);
    next()
})


// connect to DB
const db_string = process.env.MONGO_URI
const db_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const mongo_connection = mongoose.connect(db_string, db_options,
   () => {console.log(boxen('Database is connected ', {padding: 0, margin: 0, borderStyle: 'single', backgroundColor : "black", borderColor : "blue", borderStyle :"singleDouble"}))})

const sessionStore = new MongoStore ({
  // mongooseConnection : mongo_connection,
  // mongoUrl : db_string,
  url : db_string,
  collection : 'sessions'
})

//enable pre-flight
app.options('*', cors())

//Middlewaress
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

// app.set('trust proxy', true)

//create session
let express_session = {
  genid : req => {
    return uuidv4()
  },
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true,
  store : sessionStore,
  Proxy : true,
  cookie : {
    maxAge : 24 * 60 * 60 * 1000, //24hrs in a day -> 1hr/60min 1min/60sec 1s/1000ms
    secure : false
  },
  loggedIn : false
}

if (process.env.NODE_ENV === 'production') {
    express_session.cookie.secure = true  //in production serve cookies over https only
    express_session.saveUninitialized = false
}
  
const cors_options = {
  credentials : true
}

const limiter = rate_limit({
  windowMs : 15 * 60 * 1000,
  max : 100
})
app.use(limiter)

app.use('/success', session(express_session))
app.use(express.json())
app.use(cookie_parser())
app.use(cors(cors_options))
// app.use(csrf(csrf_settings))
// app.use(function(req, res, next) {
//   res.cookie('csrftoken', req.csrfToken())
//   next()
// })

// app.use(helmet())

//xss attcks prevention
app.use(xss())

//middlewares
app.use('/add-project', project)
app.use('/add-blog', blog)
app.use('/devblog', devblog)
app.use('/update-blog', editThisBlog)
app.use('/showcase-blog-request', blogRequest)
app.use('/record-ip', ip)
app.use('/api', analytics)
app.use('/sitemap.xml', sitemap)
app.use('/auth', admin)


app.post('/auth/login', async(req, res) => {
    const username = sanitize(req.body.username)
    const password = sanitize(req.body.password)
    const data = await adminModel.findOne({ username : username, password : password })

    if (data.length != 0) {
      res.status(200)
       return res.redirect('/success?u=' + data.username) //pass username in query
      }
    res.send(data)
})

app.get('/add-project/:file_name', (req, res) => {
    res.sendFile(path.join(__dirname+"/media/project/"+req.params.file_name))
})

app.get('/devblog/:blogname/:file_name', (req,res) => {
  res.sendFile(path.join(__dirname+"/media/devblog/"+ req.params.blogname + '/' +req.params.file_name))
})
app.get('/csrf', async(req, res) => {
  const csrfToken = crypto.randomBytes(50).toString('base64').slice(0, 50)
  res.send(csrfToken)
})
  
app.get('/blog/:blogname/:file_name', (req,res) => {
  res.sendFile(path.join(__dirname+"/media/blog/"+ req.params.blogname + '/' +req.params.file_name))
})

app.get('/blog/:slug', async(req, res) => {
  const thisBlog = await Blog.findOne({slug : req.params.slug})
  res.send(thisBlog)
})
app.get('/success', async(req, res, next) => {
  // const user = sanitize(req.query.u)
  req.session.loggedIn = true
  const update_session_id = await authModel.findOneAndUpdate({ username : req.query.u }, { session_id : req.sessionID })
  res.send({user : req.query.u, session_id : req.sessionID})
  
})


//csp report logging (in case of XSS attack)
app.post('/__cspreport__', (req, res) => {
});

//serve static files
app.use(express.static('client/build'))

app.get('*', (req, res) =>{
  // res.cookie('XSRF-TOKEN', req.csrfToken())
  // fs.createReadStream(path.join(__dirname+'/client/build/index.html')).pipe(res)
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})


//set headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

//to prevent error - Uncaught SyntaxError: Unexpected token <
//nocache - to prevent cache of index.html (prevents error while serving static files)
app.use(nocache())
  
app.listen(PORT, function() {
  console.log(boxen('server running on ' + PORT, {padding: 0, margin: 0, borderStyle: 'single', backgroundColor : "black", borderColor : "blue", borderStyle :"singleDouble"}))
}) 
   