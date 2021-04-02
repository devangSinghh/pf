const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("This test route is working")
})

module.exports = router