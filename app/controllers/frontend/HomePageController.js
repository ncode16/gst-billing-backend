const { pool } = require('../../../config/database')

exports.listFeature = async (req, res) => {
    try {
        let resultFeature = await pool.query('SELECT * FROM feature_master WHERE is_deleted = $1 and is_active = $2', [false, true])
        return res.status(200).json({
            success: true,
            data: resultFeature.rows,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.listFaq = async (req, res) => {
    try {
        let resultFaq = await pool.query('SELECT * FROM faq_master WHERE is_deleted = $1 and is_active = $2', [false, true])
        return res.status(200).json({
            success: true,
            data: resultFaq.rows,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.listTemplate = async (req, res) => {
    try {
        let resultTemplate = await pool.query('SELECT * FROM template_master WHERE is_deleted = $1 and is_active = $2', [false, true])
        let array = []
        resultTemplate.rows.forEach((item) => {
            let data = {
                template_id: item.template_id,
                template_name: item.template_name,
                template_image: process.env.TEMPLATE_IMAGE_URL + item.template_image,
                is_active: item.is_active,
                is_deleted: item.is_deleted,
            }
            return array.push(data)
        })
        return res.status(200).json({
            success: true,
            data: array,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.listCms = async (req, res) => {
    try {
        let resultCms = await pool.query('SELECT * FROM cms_master WHERE cms_id = $1', [req.params.cmsId])
        let finalCmsData = {
            cms_id: resultCms.rows[0].cms_id,
            cms_title: resultCms.rows[0].cms_title,
            cms_description: resultCms.rows[0].cms_description,
            cms_image: process.env.CMS_IMAGE_URL + resultCms.rows[0].cms_image,
            is_active: resultCms.rows[0].is_active,
            is_deleted: resultCms.rows[0].is_deleted,
        }
        return res.status(200).json({
            success: true,
            data: finalCmsData,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}