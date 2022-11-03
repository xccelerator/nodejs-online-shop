const { Router } = require('express')
const productController = require('../controller/productController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add',authMiddleware.checkRole('ADMIN'), productController.createProduct)
router.post('/delete',authMiddleware.checkRole('ADMIN'), productController.deleteProduct)
router.post('/update',authMiddleware.checkRole('ADMIN'), productController.updateProduct)

router.get('/', productController.getAll)

module.exports = router