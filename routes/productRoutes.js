const { Router } = require('express')
const shopController = require('../controller/shopController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add',authMiddleware.checkRole('ADMIN'), shopController.addPost)
router.post('/delete',authMiddleware.checkRole('ADMIN'), shopController.deletePost)
router.post('/update',authMiddleware.checkRole('ADMIN'), shopController.updatePost)

router.post('/addbrand',authMiddleware.checkRole('ADMIN'), shopController.addbrandPost)

router.post('/search', shopController.searchPost)

router.get('/test',authMiddleware.checkAuth, (req, res) => {
    res.send('123')
})

module.exports = router