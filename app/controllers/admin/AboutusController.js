const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const AboutusService = require('../../services/AboutusService')

exports.createAboutus = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            aboutusTitle: 'required',
            aboutusDescription: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await AboutusService.createAboutus(req.body.aboutusTitle, req.body.aboutusDescription)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'About Us Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllAboutus = async (req, res) => {
    try {
        let resultAboutUs = await pool.query('SELECT * FROM aboutus_master WHERE is_deleted = $1 ORDER BY aboutus_id DESC', [false])
        let finalResultAboutUs = await Pagination.paginator(resultAboutUs.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultAboutUs,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editAboutus = async (req, res) => {
    try {
        let resultAboutus = await pool.query('SELECT * FROM aboutus_master WHERE aboutus_id = $1', [req.params.aboutUsId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultAboutus.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateAboutus = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            aboutus_title: 'required',
            aboutus_description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await AboutusService.updateAboutus(req.params.aboutUsId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'About Us Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteAboutus = async (req, res) => {
    try {
        await AboutusService.deleteAboutus(req.params.aboutUsId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'About Us Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveAboutus = async (req, res) => {
    try {
        await AboutusService.activeInactiveAboutus(req.body.isActive, req.params.aboutUsId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'About Us Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'About Us Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}