const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const QuotationService = require('../../services/QuotationService')

exports.createQuotation = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            total_amount: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        let query = await QuotationService.createQuotation(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Quotation Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllQuotation = async (req, res) => {
    try {
        let resultQuotation = await pool.query('SELECT * FROM quotation_master WHERE is_deleted = $1 ORDER BY quotation_id DESC', [false])
        let finalResultQuotation = await Pagination.paginator(resultQuotation.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultQuotation,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editQuotation = async (req, res) => {
    try {
        let resultQuotation = await pool.query('SELECT * FROM quotation_master WHERE quotation_id = $1', [req.params.quotationId])
        return res.status(200).json({
            success: true,
            data: resultQuotation.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateQuotation = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            total_amount: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await QuotationService.updateQuotation(req.params.quotationId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Quotation Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteQuotation = async (req, res) => {
    try {
        await QuotationService.deleteQuotation(req.params.quotationId)
        return res.status(200).json({
            success: true,
            message: 'Quotation Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.cancelQuotation = async (req, res) => {
    try {
        await QuotationService.cancelQuotation(req.params.quotationId)
        return res.status(200).json({
            success: true,
            message: 'Quotation Cancelled Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}