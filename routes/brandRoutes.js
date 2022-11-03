const { Router } = require('express')
const brandController = require('../controller/brandController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add',authMiddleware.checkRole('ADMIN'), brandController.add)
//router.post('/delete',authMiddleware.checkRole('ADMIN'), brandController.del)
//router.post('/update',authMiddleware.checkRole('ADMIN'), brandController.update)

//router.post('/add', brandController.add)
router.post('/delete', brandController.del)
router.post('/update', brandController.update)
router.get('/', brandController.getAll)

module.exports = router