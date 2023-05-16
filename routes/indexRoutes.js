let {Router} = require('express')
let indexController = require('../controllers/indexController')
let router = new Router()

router.get("/", indexController.index_get)

module.exports = router