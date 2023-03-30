const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const CustomerService = require('../../services/CustomerService')
const randomstring = require('randomstring')
const invoiceFile = require('../../../config/fileUpload')
const fs = require('fs')

exports.createCustomer = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            customer_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        let query = await CustomerService.createCustomer(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Customer Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllCustomer = async (req, res) => {
    try {
        let resultCustomer = await pool.query('SELECT * FROM customer_master WHERE is_deleted = $1 ORDER BY customer_id DESC', [false])
        let finalResultCustomer = await Pagination.paginator(resultCustomer.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultCustomer,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editCustomer = async (req, res) => {
    try {
        let resultCustomer = await pool.query('SELECT * FROM customer_master WHERE customer_id = $1', [req.params.customerId])
        return res.status(200).json({
            success: true,
            data: resultCustomer.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            customer_name: 'required'
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await CustomerService.updateCustomer(req.params.customerId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Customer Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        await CustomerService.deleteCustomer(req.params.customerId)
        return res.status(200).json({
            success: true,
            message: 'Customer Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}