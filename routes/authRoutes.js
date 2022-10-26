const { Router } = require('express')
const userController = require('../controller/authController')

const router = Router()

router.post('/registration', userController.registerPost)
router.post('/login',userController.loginPost)

module.exports = router