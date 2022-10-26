const { Router } = require('express')

const authRouter = require('./authRoutes')
const productRouter = require('./productRoutes')

const router = Router()

router.use('/auth',authRouter)
router.use('/product',productRouter)

module.exports = router