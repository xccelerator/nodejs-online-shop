const { Router } = require('express')

const authRouter = require('./authRoutes')
const productRouter = require('./productRoutes')
const brandRouter = require('./brandRoutes')

const router = Router()

router.use('/auth',authRouter)
router.use('/product',productRouter)
router.use('/brand',brandRouter)

module.exports = router