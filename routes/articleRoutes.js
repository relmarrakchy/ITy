let {Router} = require('express')
let articleController = require('../controllers/articleController')
let {upload} = require('../middleware/uploadMiddleware')
let router = new Router()

router.post("/article", upload.single("image") ,articleController.addArticle)

module.exports = router