const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const ProductCategoryService = require('../../services/ProductCategoryService')

exports.createProductCategory = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            product_category_name: 'required',
            product_category_order: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        req.body.product_category_image = req.file.filename
        let query = await ProductCategoryService.createProductCategory(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Product Category Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllProductCategory = async (req, res) => {
    try {
        let resultProductCategory = await pool.query('SELECT * FROM product_category_master WHERE is_deleted = $1 ORDER BY product_category_id DESC', [false])
        let finalResultProductCategory = await Pagination.paginator(resultProductCategory.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultProductCategory,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editProductCategory = async (req, res) => {
    try {
        let resultProductCategory = await pool.query('SELECT * FROM product_category_master WHERE product_category_id = $1', [req.params.productCategoryId])
        return res.status(200).json({
            success: true,
            data: resultProductCategory.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateProductCategory = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            product_category_name: 'required',
            product_category_order: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        req.body.product_category_image = req.file.filename
        let query = await ProductCategoryService.updateProductCategory(req.params.productCategoryId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Product Category Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteProductCategory = async (req, res) => {
    try {
        await ProductCategoryService.deleteProductCategory(req.params.productCategoryId)
        return res.status(200).json({
            success: true,
            message: 'Product Category Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}