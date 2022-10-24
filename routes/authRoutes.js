const { Router } = require('express')
const userController = require('../controller/authController')
const shopController = require('../controller/shopController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/registration', userController.registerPost)
router.post('/login',userController.loginPost)
router.post('/add',shopController.addPost)
router.post('/delete',shopController.deletePost)
router.post('/update', shopController.updatePost)
router.get('/secret',authMiddleware.checkUser,userController.secretGet)

module.exports = router