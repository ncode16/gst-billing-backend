const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const ProductService = require('../../services/ProductService')

exports.createProduct = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            item_name: 'required',
            sell_price: 'required',
            tax: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        let query = await ProductService.createProduct(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Product Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        let resultProduct = await pool.query('SELECT * FROM product_master WHERE is_deleted = $1 ORDER BY product_id DESC', [false])
        let finalResultProduct = await Pagination.paginator(resultProduct.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultProduct,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editProduct = async (req, res) => {
    try {
        let resultProduct = await pool.query('SELECT * FROM product_master WHERE product_id = $1', [req.params.productId])
        return res.status(200).json({
            success: true,
            data: resultProduct.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            item_name: 'required',
            sell_price: 'required',
            tax: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await ProductService.updateProduct(req.params.productId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Product Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.productId)
        return res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}