let {Router} = require('express')
let profileController = require('../controllers/profileController')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.get("/profile", requireAuth, profileController.profile_get)
router.get("/profile/:id", requireAuth, profileController.get_profile)

module.exports = router