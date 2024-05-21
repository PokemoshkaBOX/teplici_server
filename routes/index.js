const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const teplRouter = require('./teplRouter')

router.use('/user', userRouter)
router.use('/tepl', teplRouter)

module.exports = router
