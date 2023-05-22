let {Router} = require('express')
let categoryController = require('../controllers/categoryController')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.post("/category", categoryController.addCategory)
router.patch("/category/:id", categoryController.modifyCategory)
router.delete("/category/:id", categoryController.deleteCategory)

module.exports = router