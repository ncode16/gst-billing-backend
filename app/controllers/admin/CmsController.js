const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const CmsService = require('../../services/CmsService')

exports.createCms = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            cms_title: 'required',
            cms_description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let result = await CmsService.createCms(req.body.cms_title, req.body.cms_description, req.file.filename)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'CMS Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllCms = async (req, res) => {
    try {
        let resultCms = await pool.query('SELECT * FROM cms_master WHERE is_deleted = $1 ORDER BY cms_id DESC', [false])
        let cms = []
        resultCms.rows.forEach((item) => {
            let data = {
                cms_id: item.cms_id,
                cms_title: item.cms_title,
                cms_description: item.cms_description,
                cms_image: process.env.CMS_IMAGE_URL + item.cms_image,
                is_active: item.is_active,
                is_deleted: item.is_deleted,
            }
            return cms.push(data)
        })
        let finalResultCms = await Pagination.paginator(cms, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultCms,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editCms = async (req, res) => {
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
        return res.json({
            statusCode: 200,
            success: true,
            data: finalCmsData,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateCms = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            cms_title: 'required',
            cms_description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        req.body.cms_image = req.file.filename
        let query = await CmsService.updateCms(req.params.cmsId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'CMS Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteCms = async (req, res) => {
    try {
        await CmsService.deleteCms(req.params.cmsId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'CMS Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveCms = async (req, res) => {
    try {
        await CmsService.activeInactiveCms(req.body.isActive, req.params.cmsId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'CMS Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'CMS Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}