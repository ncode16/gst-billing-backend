const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const CategoryService = require('../../services/CategoryService')

exports.createCategory = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            categoryName: 'required'
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await CategoryService.createCategory(req.body.categoryName)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'Category Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        let resultCategory = await pool.query('SELECT * FROM category_master WHERE is_deleted = $1 ORDER BY category_id', [false])
        let finalResultCategory = await Pagination.paginator(resultCategory.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultCategory,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editCategory = async (req, res) => {
    try {
        let resultCategory = await pool.query('SELECT * FROM category_master WHERE category_id = $1', [req.params.categoryId])
        return res.status(200).json({
            success: true,
            data: resultCategory.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            category_name: 'required'
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await CategoryService.updateCategory(req.params.categoryId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Category Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await CategoryService.deleteCategory(req.params.categoryId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Category Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveCategory = async (req, res) => {
    try {
        await CategoryService.activeInactiveCategory(req.body.isActive, req.params.categoryId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Category Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Category Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}

exports.listCategory = async (req, res) => {
    try {
        let resultCategory = await pool.query('SELECT * FROM category_master WHERE is_deleted = $1', [false])
        return res.status(200).json({
            success: true,
            data: resultCategory.rows,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}