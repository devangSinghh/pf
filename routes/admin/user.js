const router = require('express').Router()
const Admin = require('../../models/auth')
const crypto = require('crypto-js')
const sanitize = require('mongo-sanitize')

// Get All User Data
router.get('/', async(req, res) => {
    
    const all_users = await Admin.find({})
    const dataObject = {"title":"Admins","users":all_users}
    res.render('admin/user',{"data":dataObject})
})

// Add New User Data
router.post('/', async(req, res, next) => {

    const password = sanitize(req.body.password)
    const hashed_password = crypto.AES.encrypt(password, process.env.PASSWORD_HASH_KEY).toString()

    const user = new Admin({
        username: req.body.username,
        password: hashed_password,
        session_id : ''
    })
    // user.save().then((doc) => {
    //     res.redirect('back')
    // }, (e) => {
    //     res.status(400).send(e)
    // })
    try {
        const savedUser = await user.save()
        res.redirect('back')
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Get Single User Data
router.get('/:id', (req, res) => {
    
    Admin.find({"_id": req.params.id})
    .then((data)=>{
        var dataObject = {"modalTitle":"Edit User","modalSubmit":"Update","users":data}
        res.send({"data":dataObject})
    })
    .catch((err)=>{
    console.log(err)
    })
})

//Update Single User Data
router.post('/:id', async(req, res) => {
    const username = sanitize(req.body.username)

    try {
        const password = sanitize(req.body.password)
        const hashed_password = crypto.AES.encrypt(password, process.env.PASSWORD_HASH_KEY).toString()
        await Admin.findByIdAndUpdate(req.params.id, { username : username, password : hashed_password })
        res.redirect(302, 'back')
    }
    catch(e) {
        res.status(500).send(e)
    }
})

//Delete Single User Data
router.delete('/:id', (req, res) => {
    Admin.findByIdAndRemove(  
        req.params.id,
        // the callback function
        (err, user) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            //var dataObject = {"title":"Users"}
            //console.log(dataObject);
            return res.status(200).send("sucess");
        }
    )
})

module.exports = router;