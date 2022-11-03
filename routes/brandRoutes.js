const { Router } = require('express')
const brandController = require('../controller/brandController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add',authMiddleware.checkRole('ADMIN'), brandController.addBrand)
router.post('/delete',authMiddleware.checkRole('ADMIN'), brandController.deleteBrand)
router.post('/update',authMiddleware.checkRole('ADMIN'), brandController.updateBrand)

router.get('/', brandController.getAllBrands)

module.exports = router