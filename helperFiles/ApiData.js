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

module.exports = {
    uploadProject : uploadProject,
}