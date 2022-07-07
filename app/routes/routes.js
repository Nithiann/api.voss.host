const router = require("express").Router();
const contactRoutes = require('./contact.route')
const userRoutes = require('./user.route')

router.use('/contacts', contactRoutes)
router.use('/user', userRoutes)

module.exports = router