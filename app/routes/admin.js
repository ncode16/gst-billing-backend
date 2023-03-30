const express = require('express')
const router = express.Router()
const multer = require('multer')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/template')
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

let storageCms = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/cms')
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
        cb(null, "image-" + Date.now() + "." + fileType)
    }
})

let uploadCms = multer({ storage: storageCms })

const tokenValidate = require("../../middleware/tokencheck")

const FeatureController = require('../controllers/admin/FeatureController')
const FaqController = require('../controllers/admin/FaqController')
const AdminController = require('../controllers/admin/AdminController')
const ContactController = require('../controllers/admin/ContactController')
const TutorialController = require('../controllers/admin/TutorialController')
const TemplateController = require('../controllers/admin/TemplateController')
const CategoryController = require('../controllers/admin/CategoryController')
const SiteSettingController = require('../controllers/admin/SiteSettingController')
const CmsController = require('../controllers/admin/CmsController')

// Admin Feature API's
router.post('/create/feature', tokenValidate(), FeatureController.createFeature)
router.post('/features', tokenValidate(), FeatureController.getAllFeature)
router.get('/edit/feature/:featureId', FeatureController.editFeature)
router.post('/update/feature/:featureId', tokenValidate(), FeatureController.updateFeature)
router.post('/delete/feature/:featureId', tokenValidate(), FeatureController.deleteFeature)
router.post('/active-inactive/feature/:featureId', tokenValidate(), FeatureController.activeInactiveFeature)

// Admin FAQ API's
router.post('/create/faq', tokenValidate(), FaqController.createFaq)
router.post('/faqs', tokenValidate(), FaqController.getAllFaq)
router.get('/edit/faq/:faqId', tokenValidate(), FaqController.editFaq)
router.post('/update/faq/:faqId', tokenValidate(), FaqController.updateFaq)
router.post('/delete/faq/:faqId', tokenValidate(), FaqController.deleteFaq)
router.post('/active-inactive/faq/:faqId', tokenValidate(), FaqController.activeInactiveFaq)

// Admin User API's
router.post('/create/admin', AdminController.createAdmin)
router.post('/admin/login', AdminController.adminLogin)
router.get('/get/feature-and-faq-details', AdminController.getFaqAndFeatureList)
router.post('/users', AdminController.getAllUser)
router.post('/add/user', tokenValidate(), AdminController.addUser)
router.get('/edit/user/:userId', tokenValidate(), AdminController.editUser)
router.post('/update/user/:userId', tokenValidate(), AdminController.updateUser)
router.post('/delete/user/:userId', tokenValidate(), AdminController.deleteUser)
router.post('/active-inactive/user/:userId', AdminController.activeInactiveUser)
router.post('/admin/forgot-password', AdminController.forgotPassword)
router.post('/admin/reset-password', AdminController.resetPassword)

// Admin Contact API's
router.post('/contacts', tokenValidate(), ContactController.getAllUserContact)
router.get('/get/contact/:contactId', tokenValidate(), ContactController.getUserContact)
router.post('/update/contact/:contactId', tokenValidate(), ContactController.updateUserContact)
router.post('/delete/contact/:contactId', tokenValidate(), ContactController.deleteUserContact)
router.post('/active-inactive/contact/:contactId', tokenValidate(), ContactController.activeInactiveUserContact)
router.post('/send/contact-email', tokenValidate(), ContactController.sendUserContactEmail)

// Admin Tutorial API's
router.post('/create/tutorial', tokenValidate(), TutorialController.createTutorial)
router.post('/tutorials', tokenValidate(), TutorialController.getAllTutorial)
router.get('/edit/tutorial/:tutorialId', tokenValidate(), TutorialController.editTutorial)
router.post('/update/tutorial/:tutorialId', tokenValidate(), TutorialController.updateTutorial)
router.post('/delete/tutorial/:tutorialId', tokenValidate(), TutorialController.deleteTutorial)
router.post('/active-inactive/tutorial/:tutorialId', tokenValidate(), TutorialController.activeInactiveTutorial)

// Admin Template API's
router.post('/create/template', tokenValidate(), upload.single('template_image'), TemplateController.createTemplate)
router.post('/templates', tokenValidate(), TemplateController.getAllTemplate)
router.get('/edit/template/:templateId', tokenValidate(), TemplateController.editTemplate)
router.post('/update/template/:templateId', tokenValidate(), upload.single('template_image'), TemplateController.updateTemplate)
router.post('/delete/template/:templateId', tokenValidate(), TemplateController.deleteTemplate)
router.post('/active-inactive/template/:templateId', tokenValidate(), TemplateController.activeInactiveTemplate)

// Admin Category API's
router.post('/create/category', tokenValidate(), CategoryController.createCategory)
router.post('/categories', tokenValidate(), CategoryController.getAllCategory)
router.get('/list/category', tokenValidate(), CategoryController.listCategory)
router.get('/edit/category/:categoryId', tokenValidate(), CategoryController.editCategory)
router.post('/update/category/:categoryId', tokenValidate(), CategoryController.updateCategory)
router.post('/delete/category/:categoryId', tokenValidate(), CategoryController.deleteCategory)
router.post('/active-inactive/category/:categoryId', tokenValidate(), CategoryController.activeInactiveCategory)

// Admin Site Setting API's
router.post('/create/site', tokenValidate(), SiteSettingController.createSiteSetting)
router.post('/sites', tokenValidate(), SiteSettingController.getAllSiteSetting)
router.get('/edit/site/:siteSettingId', tokenValidate(), SiteSettingController.editSiteSetting)
router.post('/update/site/:siteSettingId', tokenValidate(), SiteSettingController.updateSiteSetting)
router.post('/delete/site/:siteSettingId', tokenValidate(), SiteSettingController.deleteSiteSetting)
router.post('/active-inactive/site/:siteSettingId', tokenValidate(), SiteSettingController.activeInactiveSiteSetting)

// Admin CMS API's
router.post('/create/cms', tokenValidate(), uploadCms.single('cms_image'), CmsController.createCms)
router.post('/cms', tokenValidate(), CmsController.getAllCms)
router.get('/edit/cms/:cmsId', tokenValidate(), CmsController.editCms)
router.post('/update/cms/:cmsId', tokenValidate(), uploadCms.single('cms_image'), CmsController.updateCms)
router.post('/delete/cms/:cmsId', tokenValidate(), CmsController.deleteCms)
router.post('/active-inactive/cms/:cmsId', tokenValidate(), CmsController.activeInactiveCms)

module.exports = router