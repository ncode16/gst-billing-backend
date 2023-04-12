const express = require('express')
const router = express.Router()
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/product-category')
    },
    filename: (req, file, cb) => {
        let fileType = ''
        if (file.mimetype === "image/png") {
            fileType = "png"
        }
        if (file.mimetype === "image/jpg") {
            fileType = "jpg"
        }
        if (file.mimetype === "image/jpeg") {
            fileType = "jpeg"
        }
        cb(null, "image-" + Date.now() + "." + fileType)
    }
})

let upload = multer({ storage: storage })

let signatureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/signature')
    },
    filename: (req, file, cb) => {
        let fileType = ''
        if (file.mimetype === "image/png") {
            fileType = "png"
        }
        if (file.mimetype === "image/jpg") {
            fileType = "jpg"
        }
        if (file.mimetype === "image/jpeg") {
            fileType = "jpeg"
        }
        cb(null, "image-" + Date.now() + "." + fileType)
    }
})

let uploadSignature = multer({ storage: signatureStorage })

let storageInvoice = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/invoice')
    },
    filename: (req, file, cb) => {
        let fileType = ''
        if (file.mimetype === "image/png") {
            fileType = "png"
        }
        if (file.mimetype === "image/jpg") {
            fileType = "jpg"
        }
        if (file.mimetype === "image/jpeg") {
            fileType = "jpeg"
        }
        if (file.mimetype === "image/webp") {
            fileType = "webp"
        }
        if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            fileType = "docx"
        }
        if (file.mimetype === "application/pdf") {
            fileType = "pdf"
        }
        cb(null, Date.now() + "." + fileType)
    }
})
let uploadInvoice = multer({ storage: storageInvoice })

let storageExpense = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/expense')
    },
    filename: (req, file, cb) => {
        let fileType = ''
        if (file.mimetype === "image/png") {
            fileType = "png"
        }
        if (file.mimetype === "image/jpg") {
            fileType = "jpg"
        }
        if (file.mimetype === "image/jpeg") {
            fileType = "jpeg"
        }
        if (file.mimetype === "image/webp") {
            fileType = "webp"
        }
        if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            fileType = "docx"
        }
        if (file.mimetype === "application/pdf") {
            fileType = "pdf"
        }
        cb(null, Date.now() + "." + fileType)
    }
})
let uploadExpense = multer({ storage: storageExpense })

const tokencheck = require('../../middleware/tokencheck')

const UserController = require('../controllers/frontend/UserController')
const ContactUsController = require('../controllers/frontend/ContactUsController')
const HomePageController = require('../controllers/frontend/HomePageController')
const DocumentSettingController = require('../controllers/frontend/DocumentSettingController')
const InvoiceController = require('../controllers/frontend/InvoiceController')
const CustomerController = require('../controllers/frontend/CustomerController')
const BillingAddressController = require('../controllers/frontend/BillingAddressController')
const ShippingAddressController = require('../controllers/frontend/ShippingAddressController')
const BankController = require('../controllers/frontend/BankController')
const ProductController = require('../controllers/frontend/ProductController')
const ExpenseController = require('../controllers/frontend/ExpenseController')
const PurchaseController = require('../controllers/frontend/PurchaseController')
const VendorController = require('../controllers/frontend/VendorController')
const QuotationController = require('../controllers/frontend/QuotationController')
const CompanyController = require('../controllers/frontend/CompanyController')
const ProductCategoryController = require('../controllers/frontend/ProductCategoryController')
const SignatureController = require('../controllers/frontend/SignatureController')
const DocumentNotesController = require('../controllers/frontend/DocumentNotesController')
const EmailTemplateController = require('../controllers/frontend/EmailTemplateController')

// User Authentication API's
router.post('/user/login', UserController.login)
router.post('/user/verify-mobile-otp', UserController.verifyMobileOtp)
router.post('/user/resend-mobile-otp', UserController.resendMobileOtp)
router.post('/user/update-profile/:userId', tokencheck(), UserController.updateUserProfile)
router.get('/user/profile/:userId', tokencheck(), UserController.getUserProfile)
router.post('/send-purchase-sms', tokencheck(), UserController.sendPurchaseSms)

// User Contact Us API
router.post('/user/add-contact', ContactUsController.createUserContact)

// Home Page API's
router.get('/list/feature', HomePageController.listFeature)
router.get('/list/faq', HomePageController.listFaq)
router.get('/list/template', HomePageController.listTemplate)
router.get('/list/cms/:cmsId', HomePageController.listCms)

// User Document API's
router.post('/update/document-setting/:documentId', tokencheck(), DocumentSettingController.updateDocument)
router.get('/get/document-setting/:documentId', tokencheck(), DocumentSettingController.getDocumentSetting)

// Invoice API's
router.post('/create/invoice', tokencheck(), uploadInvoice.single('attach_file'), InvoiceController.createInvoice)
router.post('/invoices', tokencheck(), InvoiceController.getAllInvoice)
router.get('/edit/invoice/:invoiceId', tokencheck(), InvoiceController.editInvoice)
router.post('/update/invoice/:invoiceId', tokencheck(), uploadInvoice.single('attach_file'), InvoiceController.updateInvoice)
router.post('/delete/invoice/:invoiceId', tokencheck(), InvoiceController.deleteInvoice)
router.post('/cancel/invoice/:invoiceId', tokencheck(), InvoiceController.cancelInvoice)
router.post('/send/pending-payment-invoice', tokencheck(), uploadInvoice.single('attach_file'), InvoiceController.sendPendingInvoicePaymentReminder)

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

// Bank Details API's
router.post('/create/bank', tokencheck(), BankController.createBank)
router.post('/bank', tokencheck(), BankController.getAllBank)
router.get('/edit/bank/:bankId', tokencheck(), BankController.editBank)
router.post('/update/bank/:bankId', tokencheck(), BankController.updateBank)
router.post('/delete/bank/:bankId', tokencheck(), BankController.deleteBank)

// Product API's
router.post('/create/product', tokencheck(), ProductController.createProduct)
router.post('/product', tokencheck(), ProductController.getAllProduct)
router.get('/edit/product/:productId', tokencheck(), ProductController.editProduct)
router.post('/update/product/:productId', tokencheck(), ProductController.updateProduct)
router.post('/delete/product/:productId', tokencheck(), ProductController.deleteProduct)

// Expense API's
router.post('/create/expense', tokencheck(), ExpenseController.createExpense)
router.post('/expense', tokencheck(), ExpenseController.getAllExpense)
router.get('/edit/expense/:expenseId', tokencheck(), ExpenseController.editExpense)
router.post('/update/expense/:expenseId', tokencheck(), ExpenseController.updateExpense)
router.post('/delete/expense/:expenseId', tokencheck(), ExpenseController.deleteExpense)
router.post('/cancel/expense/:expenseId', tokencheck(), ExpenseController.cancelExpense)
router.post('/search/expense', tokencheck(), ExpenseController.searchExpense)

// Purchase API's
router.post('/create/purchase', tokencheck(), PurchaseController.createPurchase)
router.post('/purchases', tokencheck(), PurchaseController.getAllPurchase)
router.get('/edit/purchase/:purchaseId', tokencheck(), PurchaseController.editPurchase)
router.post('/update/purchase/:purchaseId', tokencheck(), PurchaseController.updatePurchase)
router.post('/delete/purchase/:purchaseId', tokencheck(), PurchaseController.deletePurchase)
router.post('/cancel/purchase/:purchaseId', tokencheck(), PurchaseController.cancelPurchase)

// Vendor API's
router.post('/create/vendor', tokencheck(), VendorController.createVendor)
router.post('/vendors', tokencheck(), VendorController.getAllVendor)
router.get('/edit/vendor/:vendorId', tokencheck(), VendorController.editVendor)
router.post('/update/vendor/:vendorId', tokencheck(), VendorController.updateVendor)
router.post('/delete/vendor/:vendorId', tokencheck(), VendorController.deleteVendor)
router.post('/cancel/vendor/:vendorId', tokencheck(), VendorController.cancelVendor)

// Quotation API's
router.post('/create/quotation', tokencheck(), QuotationController.createQuotation)
router.post('/quotations', tokencheck(), QuotationController.getAllQuotation)
router.get('/edit/quotation/:quotationId', tokencheck(), QuotationController.editQuotation)
router.post('/update/quotation/:quotationId', tokencheck(), QuotationController.updateQuotation)
router.post('/delete/quotation/:quotationId', tokencheck(), QuotationController.deleteQuotation)
router.post('/cancel/quotation/:quotationId', tokencheck(), QuotationController.cancelQuotation)

// Company API's
router.post('/create/company', tokencheck(), CompanyController.createCompany)
router.post('/companies', tokencheck(), CompanyController.getAllCompany)
router.get('/edit/company/:companyId', tokencheck(), CompanyController.editCompany)
router.post('/update/company/:companyId', tokencheck(), CompanyController.updateCompany)

// Product Category API's
router.post('/create/product-category', tokencheck(), upload.single('product_category_image'), ProductCategoryController.createProductCategory)
router.post('/product-category', tokencheck(), ProductCategoryController.getAllProductCategory)
router.get('/edit/product-category/:productCategoryId', tokencheck(), ProductCategoryController.editProductCategory)
router.post('/update/product-category/:productCategoryId', tokencheck(), upload.single('product_category_image'), ProductCategoryController.updateProductCategory)
router.post('/delete/product-category/:productCategoryId', tokencheck(), ProductCategoryController.deleteProductCategory)

// Signature API's
router.post('/create/signature', tokencheck(), uploadSignature.single('signature_image'), SignatureController.createSignature)
router.post('/signature', tokencheck(), SignatureController.getAllSignature)
router.get('/edit/signature/:signatureId', tokencheck(), SignatureController.editSignature)
router.post('/update/signature/:signatureId', tokencheck(), uploadSignature.single('signature_image'), SignatureController.updateSignature)
router.post('/delete/signature/:signatureId', tokencheck(), SignatureController.deleteSignature)

// Document Notes API's
router.post('/create/document-notes', tokencheck(), DocumentNotesController.createDocumentNotes)
router.post('/document-notes', tokencheck(), DocumentNotesController.getAllDocumentNotes)
router.get('/edit/document-notes/:documentNotesId', tokencheck(), DocumentNotesController.editDocumentNotes)
router.post('/update/document-notes/:documentNotesId', tokencheck(), DocumentNotesController.updateDocumentNotes)
router.post('/delete/document-notes/:documentNotesId', tokencheck(), DocumentNotesController.deleteDocumentNotes)
router.post('/active-inactive/document-notes/:documentNotesId', tokencheck(), DocumentNotesController.activeInactiveDocumentNotes)
router.post('/default/document-notes/:documentNotesId', tokencheck(), DocumentNotesController.defaultDocumentNotes)

// Email Template API's
router.post('/create/email-template', tokencheck(), EmailTemplateController.createEmailTemplate)
router.post('/email-template', tokencheck(), EmailTemplateController.getAllEmailTemplate)
router.get('/edit/email-template/:emailTemplateId', tokencheck(), EmailTemplateController.editEmailTemplate)
router.post('/update/email-template/:emailTemplateId', tokencheck(), EmailTemplateController.updateEmailTemplate)
router.post('/delete/email-template/:emailTemplateId', tokencheck(), EmailTemplateController.deleteEmailTemplate)
router.post('/active-inactive/email-template/:emailTemplateId', tokencheck(), EmailTemplateController.activeInactiveEmailTemplate)
router.post('/default/email-template/:emailTemplateId', tokencheck(), EmailTemplateController.defaultEmailTemplate)

module.exports = router