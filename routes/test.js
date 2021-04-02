const router = require('express')

router.get('/', (req, res) => {
    res.send("This test route is working")
})

module.exports = router