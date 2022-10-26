const { Router } = require('express')
const shopController = require('../controller/shopController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/add',authMiddleware.checkAdmin('ADMIN'), shopController.addPost)
router.post('/delete',authMiddleware.checkAdmin('ADMIN'), shopController.deletePost)
router.post('/update',authMiddleware.checkAdmin('ADMIN'), shopController.updatePost)
router.get('/test',authMiddleware.checkAuth, (req, res) => {
    res.send('123')
})

module.exports = router