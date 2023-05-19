let {Router} = require('express')
let commentController = require('../controllers/commentController')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.post("/comment", requireAuth, commentController.comment_post)
router.delete("/comment/:id", requireAuth, commentController.comment_delete)
router.patch("/comment/:id", requireAuth, commentController.comment_mod)

module.exports = router