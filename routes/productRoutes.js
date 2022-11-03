const { Router } = require('express')
const shopController = require('../controller/productController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add',authMiddleware.checkRole('ADMIN'), shopController.createProduct)
//router.post('/delete',authMiddleware.checkRole('ADMIN'), shopController.deletePost)
//router.post('/update',authMiddleware.checkRole('ADMIN'), shopController.updatePost)

//router.post('/add', shopController.createProduct)
router.post('/delete', shopController.deleteProduct)
router.post('/update', shopController.updateProduct)

module.exports = router