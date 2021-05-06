//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const router = require('express').Router()
var CryptoJS = require("crypto-js")

router.get('/', async(req, res) => {
    try {
        const date = Date.now().toLocaleString()
        var ciphertext = CryptoJS.AES.encrypt(date, process.env.CSRF_SECRET).toString()
        res.send(ciphertext)
      }
      catch(e) {
        console.log(e)
      }
})

module.exports = router