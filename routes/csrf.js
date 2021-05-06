const router = require('express').Router()
const crypto = require('crypto')

const csrfToken = crypto.randomBytes(50).toString('base64').slice(0, 50)

router.get('/', async(req, res) => {
    try {
        res.send(csrfToken)
      }
      catch(e) {
        console.log(e)
      }
})

module.exports = router