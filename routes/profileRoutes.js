let {Router} = require('express')
let profileController = require('../controllers/profileController')
let {requireAuth} = require('../middleware/authMiddleware')
let router = new Router()

router.get("/profile", requireAuth, profileController.profile_get)

module.exports = router