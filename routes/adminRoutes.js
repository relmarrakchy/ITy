let {Router} = require('express')
let adminController = require('../controllers/adminController')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.get("/admin", requireAuth, adminController.admin_get)
router.get("/data", adminController.get_data)
router.post("/admin", requireAuth, adminController.addAdmin)
router.patch("/admin/:id", requireAuth, adminController.modifyAdmin)

module.exports = router