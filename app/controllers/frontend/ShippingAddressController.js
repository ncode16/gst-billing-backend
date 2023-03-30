const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const ShippingAddressService = require('../../services/ShippingAddressService')

exports.createShippingAddress = async (req, res) => {
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
        let query = await ShippingAddressService.createShippingAddress(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Shipping Address Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllShippingAddress = async (req, res) => {
    try {
        let resultShippingAddress = await pool.query('SELECT * FROM shipping_address_master WHERE is_deleted = $1 ORDER BY shipping_address_id DESC', [false])
        let finalResultShippingAddress = await Pagination.paginator(resultShippingAddress.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultShippingAddress,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editShippingAddress = async (req, res) => {
    try {
        let resultShippingAddress = await pool.query('SELECT * FROM shipping_address_master WHERE shipping_address_id = $1', [req.params.shippingAddressId])
        return res.status(200).json({
            success: true,
            data: resultShippingAddress.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateShippingAddress = async (req, res) => {
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
        let query = await ShippingAddressService.updateShippingAddress(req.params.shippingAddressId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Shipping Address Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteShippingAddress = async (req, res) => {
    try {
        await ShippingAddressService.deleteShippingAddress(req.params.shippingAddressId)
        return res.status(200).json({
            success: true,
            message: 'Shipping Address Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}