//for reading environment variables
const dotenv = require('dotenv')
dotenv.config()

const express= require('express')
const path = require('path')

//create express app
const app= express()

//for cross browser access
const cors = require('cors')

//for SES configuration
const AWS = require('aws-sdk')

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
const editThisBlog = require('./routes/editThisBlog')
const blogRequest = require('./routes/showcaseBlogRequests')
const ip = require('./routes/ip')

//Port
const PORT = 6161

app.use('*', function(req, res, next) {

//replace localhost:8080 to the ip address:port of your server
res.header("Access-Control-Allow-Origin", "http://thedevang.com")
res.header("Access-Control-Allow-Headers", "X-Requested-With")
res.header('Access-Control-Allow-Headers', 'Content-Type')
res.header('Access-Control-Allow-Credentials', true)
next() 
})

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
app.use('/update-blog', editThisBlog)
app.use('/showcase-blog-request', blogRequest)
app.use('/record-ip', ip);

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.aws_access_key;
AWS.config.secretAccessKey = process.env.aws_secret_key;
AWS.config.region = process.env.aws_reigon;
const email = "devang.iitk@gmail.com";
let ses = new AWS.SES();

// connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is connected!"))

app.post('/send-confirmation-mail', async(req, res) => {
  // Aws ses send mail section
  var ses_mail = "From: 'Rotaract Club' <" + email + ">\n"
  ses_mail = ses_mail + "To: " + email + "\n"
  ses_mail = ses_mail + "Subject: A Rotary Story just popped up\n"
  ses_mail = ses_mail + "MIME-Version: 1.0\n"
  ses_mail = ses_mail + "Content-Type: multipart/mixed boundary=\"NextPart\"\n\n"
  ses_mail = ses_mail + "--NextPart\n"
  ses_mail = ses_mail + "Content-Type: text/html charset=us-ascii\n\n"
  ses_mail = ses_mail + "This is should be a html text.\n\n"
  ses_mail = ses_mail + "--NextPart\n"
  ses_mail = ses_mail + "Content-Type: text/plain\n"
  ses_mail = ses_mail + "Content-Disposition: attachment filename=\"Story.txt\"\n\n"
  ses_mail = ses_mail + "Name:"+req.body.name+"\n"+
  "Email:"+req.body.email+"\n"+
  "Title:"+req.body.title+"\n"+
  "Story:"+req.body.story+"\n" + "\n\n"
  ses_mail = ses_mail + "--NextPart--"
  var params = {
      RawMessage: { Data: new Buffer.from(ses_mail) },
      Destinations: [ email ],
      Source: "'Rotaract Club' <" + email + ">'"
    }
  ses.sendRawEmail(params, function(err, data) {
    if(err) {
        res.send(err);
    } 
    else {
        res.send(data);
    }           
  })
  
})

app.get('/success', (req, res) => {
  console.log('success')
  res.send('success')
})

//logout api
app.get('/logout', function(req, res){
  
  req.logout()
  console.log("Logged out!!")
  return res.redirect('/')
})

//google login routes
app.get('/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

//callback route
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.cookie("user",req.user._id)
  res.redirect('/home')
})

app.get('/add-project/:file_name', (req,res) => {
    res.sendFile(path.join(__dirname+"/media/project/"+req.params.file_name))
})
  
app.get('/blog/:blogname/:file_name', (req,res) => {
  res.sendFile(path.join(__dirname+"/media/blog/"+ req.params.blogname + '/' +req.params.file_name))
})

//facebook login routes
app.get('/facebook/login', passport.authenticate('facebook', { scope : 'email' } ))

//facebook callback route
app.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login' }), (req, res) => {
  res.cookie("user",req.user._id)
  res.redirect('/home')
})

app.get('/blog/:slug', async(req, res) => {
  const thisBlog = await Blog.findOne({slug : req.params.slug})
  // console.log(thisBlog)

  res.send(thisBlog)
})

app.use(express.static('client/build'))

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
  
app.listen(PORT, function() {
      console.log('App running on port 6161')
}) 
   