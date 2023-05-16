let multer = require('multer')
let path = require('path')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

module.exports = { upload }