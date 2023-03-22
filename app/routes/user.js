const express = require('express')
const router = express.Router()

const UserController = require('../controllers/frontend/UserController')
const ContactUsController = require('../controllers/frontend/ContactUsController')
const HomePageController = require('../controllers/frontend/HomePageController')

// User Authentication API's
router.post('/user/login', UserController.login)
router.post('/user/verify-mobile-otp', UserController.verifyMobileOtp)
router.post('/user/resend-mobile-otp', UserController.resendMobileOtp)

// User Contact Us API
router.post('/user/add-contact', ContactUsController.createUserContact)

// Home Page API's
router.get('/list/feature', HomePageController.listFeature)
router.get('/list/faq', HomePageController.listFaq)
router.get('/list/template', HomePageController.listTemplate)

module.exports = router