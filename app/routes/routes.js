const router = require("express").Router();
const contactRoutes = require('./contact.route')

router.use('/contacts', contactRoutes)

module.exports = router