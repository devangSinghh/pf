const express = require('express')
const router = express.Router()

// Home Page - Route
router.use('/', require('./user/home'))
// Admin Page - Route
router.use('/login', require('./admin/login'))
router.use('/admin', require('./admin/home'))
router.use('/admin/user', require('./admin/user'))
router.use('/route/project', require('./addProject'))
router.use('/route/blogs', require('./devblog'))
// router.use('/admin/api', require('./admin/api'))

module.exports = router;
