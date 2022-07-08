const authController = require('../controllers/auth.controller')
const userContorller = require('../controllers/user.controller')
const router = require("express").Router();
const contactRoutes = require('./contact.route')
const userRoutes = require('./user.route')

router.use('/contacts', contactRoutes)
router.use('/user', userRoutes)

// find userid by email, send uid back and place in custom token
router.post('/login', userContorller.GETbyMail, authController.login)

module.exports = router