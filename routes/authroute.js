let {Router} = require('express')
let authController = require('../controllers/authController')
let router = new Router()

router.get("/login", authController.login_get)
router.post("/login", authController.login_post)

router.get("/signup", authController.signup_get)
router.post("/signup", authController.signup_post)

router.get('/logout', authController.logout)

module.exports = router