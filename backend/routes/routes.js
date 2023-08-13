const router = require('express').Router()



router.use('/auth', require('./auth'))
router.use('/boards', require('./board'))
// router.post()

module.exports = router

