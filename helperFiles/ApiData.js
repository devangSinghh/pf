const multer = require('multer')

const storageProjects = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/project')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadProject = multer({ storage: storageProjects }).single('file')


//storage for blogs
const storageBlogs = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/blog')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadBlog = multer({ storage: storageBlogs }).single('blogfile')

//storage for dev blogs
const storageDevBlogs = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/devblog')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadDevBlog = multer({ storage: storageDevBlogs }).single('devblogfile')

module.exports = {
    uploadProject : uploadProject,
    uploadBlog : uploadBlog,
    uploadDevBlog : uploadDevBlog
}