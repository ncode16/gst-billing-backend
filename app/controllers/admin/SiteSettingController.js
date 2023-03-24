const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const SiteSettingService = require('../../services/SiteSettingService')

exports.createSiteSetting = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            siteSettingUrl: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await SiteSettingService.createSiteSetting(req.body.siteSettingUrl)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'Site Setting Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllSiteSetting = async (req, res) => {
    try {
        let resultSiteSetting = await pool.query('SELECT * FROM site_setting_master WHERE is_deleted = $1 ORDER BY site_setting_id DESC', [false])
        let finalResultSiteSetting = await Pagination.paginator(resultSiteSetting.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultSiteSetting,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editSiteSetting = async (req, res) => {
    try {
        let resultSiteSetting = await pool.query('SELECT * FROM site_setting_master WHERE site_setting_id = $1', [req.params.siteSettingId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultSiteSetting.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateSiteSetting = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            site_setting_url: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await SiteSettingService.updateSiteSetting(req.params.siteSettingId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Site Setting Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteSiteSetting = async (req, res) => {
    try {
        await SiteSettingService.deleteSiteSetting(req.params.siteSettingId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Site Setting Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveSiteSetting = async (req, res) => {
    try {
        await SiteSettingService.activeInactiveSiteSetting(req.body.isActive, req.params.siteSettingId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Site Setting Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Site Setting Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}