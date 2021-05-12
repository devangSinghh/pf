const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', { title : 'node panel' })
})

module.exports = router