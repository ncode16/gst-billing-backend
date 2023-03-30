const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const FaqService = require('../../services/FaqService')

exports.createFaq = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            title: 'required',
            description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await FaqService.createFaq(req.body.title, req.body.description)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'FAQ Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllFaq = async (req, res) => {
    try {
        let resultFaq = await pool.query('SELECT * FROM faq_master WHERE is_deleted = $1 ORDER BY faq_id DESC', [false])
        let finalResultFaq = await Pagination.paginator(resultFaq.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultFaq,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editFaq = async (req, res) => {
    try {
        let resultFaq = await pool.query('SELECT * FROM faq_master WHERE faq_id = $1', [req.params.faqId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultFaq.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateFaq = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            title: 'required',
            description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await FaqService.updateFaq(req.params.faqId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'FAQ Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteFaq = async (req, res) => {
    try {
        await FaqService.deleteFaq(req.params.faqId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'FAQ Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveFaq = async (req, res) => {
    try {
        await FaqService.activeInactiveFaq(req.body.isActive, req.params.faqId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'FAQ Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'FAQ Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}