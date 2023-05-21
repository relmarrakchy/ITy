let {Router} = require('express')
let settingsController = require('../controllers/settingsController')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.get("/settings", requireAuth, settingsController.get_Settings)
router.post("/settings", requireAuth, settingsController.post_settings)
router.delete("/settings/:id", requireAuth, settingsController.deleteUser)

module.exports = router