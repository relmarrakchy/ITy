let {Router} = require('express')
let articleController = require('../controllers/articleController')
let {upload} = require('../middleware/uploadMiddleware')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.get("/article/:id", requireAuth, articleController.getArticle)
router.post("/article", requireAuth, upload.single('image'), articleController.addArticle)
router.patch("/article/:id", requireAuth, articleController.modifyArticle)
router.delete("/article/:id", requireAuth, articleController.deleteArticle)

module.exports = router