const multer = require('multer')

const storageProjects = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/project')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadProject = multer({ storage: storageProjects }).single('file');


//storage for blogs
const storageBlogs = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/blog')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const uploadBlog = multer({ storage: storageBlogs }).single('blogfile');

module.exports = {
    uploadProject : uploadProject,
    uploadBlog : uploadBlog
}