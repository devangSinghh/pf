const express = require('express')
const router = express.Router()

router.get('/node/user/home/', (req, res) => {
    res.render('user/home')
})

module.exports = router;