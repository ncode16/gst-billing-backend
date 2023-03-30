const express = require('express')
const router = express.Router()

const tokencheck = require('../../middleware/tokencheck')

const UserController = require('../controllers/frontend/UserController')
const ContactUsController = require('../controllers/frontend/ContactUsController')
const HomePageController = require('../controllers/frontend/HomePageController')
const DocumentSettingController = require('../controllers/frontend/DocumentSettingController')
const InvoiceController = require('../controllers/frontend/InvoiceController')
const CustomerController = require('../controllers/frontend/CustomerController')
const BillingAddressController = require('../controllers/frontend/BillingAddressController')
const ShippingAddressController = require('../controllers/frontend/ShippingAddressController')

// User Authentication API's
router.post('/user/login', UserController.login)
router.post('/user/verify-mobile-otp', UserController.verifyMobileOtp)
router.post('/user/resend-mobile-otp', UserController.resendMobileOtp)
router.post('/user/update-profile/:userId', tokencheck(), UserController.updateUserProfile)
router.get('/user/profile/:userId', tokencheck(), UserController.getUserProfile)

// User Contact Us API
router.post('/user/add-contact', ContactUsController.createUserContact)

// Home Page API's
router.get('/list/feature', HomePageController.listFeature)
router.get('/list/faq', HomePageController.listFaq)
router.get('/list/template', HomePageController.listTemplate)
router.get('/list/cms', HomePageController.listCms)

// User Document API's
router.post('/update/document-setting/:documentId', tokencheck(), DocumentSettingController.updateDocument)
router.get('/get/document-setting/:documentId', tokencheck(), DocumentSettingController.getDocumentSetting)

// Invoice API's
router.post('/create/invoice', tokencheck(), InvoiceController.createInvoice)
router.post('/invoices', tokencheck(), InvoiceController.getAllInvoice)
router.get('/edit/invoice/:invoiceId', tokencheck(), InvoiceController.editInvoice)
router.post('/update/invoice/:invoiceId', tokencheck(), InvoiceController.updateInvoice)
router.post('/delete/invoice/:invoiceId', tokencheck(), InvoiceController.deleteInvoice)
router.post('/cancel/invoice/:invoiceId', tokencheck(), InvoiceController.cancelInvoice)

// Customer API's
router.post('/create/customer', tokencheck(), CustomerController.createCustomer)
router.post('/customers', tokencheck(), CustomerController.getAllCustomer)
router.get('/edit/customer/:customerId', tokencheck(), CustomerController.editCustomer)
router.post('/update/customer/:customerId', tokencheck(), CustomerController.updateCustomer)
router.post('/delete/customer/:customerId', tokencheck(), CustomerController.deleteCustomer)

// Billing Address API's
router.post('/create/billing-address', tokencheck(), BillingAddressController.createBillingAddress)
router.post('/billing-address', tokencheck(), BillingAddressController.getAllBillingAddress)
router.get('/edit/billing-address/:billingAddressId', tokencheck(), BillingAddressController.editBillingAddress)
router.post('/update/billing-address/:billingAddressId', tokencheck(), BillingAddressController.updateBillingAddress)
router.post('/delete/billing-address/:billingAddressId', tokencheck(), BillingAddressController.deleteBillingAddress)

// Shipping Address API's
router.post('/create/shipping-address', tokencheck(), ShippingAddressController.createShippingAddress)
router.post('/shipping-address', tokencheck(), ShippingAddressController.getAllShippingAddress)
router.get('/edit/shipping-address/:shippingAddressId', tokencheck(), ShippingAddressController.editShippingAddress)
router.post('/update/shipping-address/:shippingAddressId', tokencheck(), ShippingAddressController.updateShippingAddress)
router.post('/delete/shipping-address/:shippingAddressId', tokencheck(), ShippingAddressController.deleteShippingAddress)

module.exports = router