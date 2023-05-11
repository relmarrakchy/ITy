let {Router} = require('express')
let authController = require('../controllers/authController')
let router = new Router()

router.get("/login", authController.login_get)

router.get("/signup", authController.signup_get)

module.exports = router