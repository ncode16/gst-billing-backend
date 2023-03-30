const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const BillingAddressService = require('../../services/BillingAddressService')

exports.createBillingAddress = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            state: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        let query = await BillingAddressService.createBillingAddress(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Billing Address Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllBillingAddress = async (req, res) => {
    try {
        let resultBillingAddress = await pool.query('SELECT * FROM billing_address_master WHERE is_deleted = $1 ORDER BY billing_address_id DESC', [false])
        let finalResultBillingAddress = await Pagination.paginator(resultBillingAddress.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultBillingAddress,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editBillingAddress = async (req, res) => {
    try {
        let resultBillingAddress = await pool.query('SELECT * FROM billing_address_master WHERE billing_address_id = $1', [req.params.billingAddressId])
        return res.status(200).json({
            success: true,
            data: resultBillingAddress.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateBillingAddress = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            state: 'required'
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await BillingAddressService.updateBillingAddress(req.params.billingAddressId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Billing Address Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteBillingAddress = async (req, res) => {
    try {
        await BillingAddressService.deleteBillingAddress(req.params.billingAddressId)
        return res.status(200).json({
            success: true,
            message: 'Billing Address Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}