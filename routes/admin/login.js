const router = require('express').Router()
const crypto = require('crypto-js')
const sanitize = require('mongo-sanitize')
const admin = require('../../models/auth')

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.post('/', async(req, res) => {
    const hiddentext = sanitize(req.body.hiddenText)

    if(hiddentext.length === 0) return

    const password = sanitize(req.body.password)
    const username = sanitize(req.body.username)

    const user = await admin.findOne({ username : username })
    if(user === null || user.length === 0) return

    const bytes = crypto.AES.decrypt(user.password, process.env.PASSWORD_HASH_KEY)
    const decrypted_password = JSON.parse(bytes.toString(crypto.enc.Utf8))

    if((user.username.length !== 0 || user.length !== 0) && decrypted_password.toString() === password) {
        
        const date = Date.now().toLocaleString()
        const token = crypto.AES.encrypt(date, process.env.S_O_L).toString()

        res.cookie('session_id', token, { maxAge : 24*60*60*1000 })
        res.cookie('admin', user.username, { maxAge : 24*60*60*1000 })

        try {
            await admin.findOneAndUpdate({ username : username }, { session_id : token })
        }
        catch (e) {
            if(process.env.NODE_ENV==='development') throw e
            else console.log('user session not updated')
        }        
        res.redirect(302, '/admin')
        res.end()
    }
    else {
        res.sendStatus(400)
    }

})

module.exports = router