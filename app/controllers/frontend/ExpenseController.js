const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const ExpenseService = require('../../services/ExpenseService')
const expenseFile = require('../../../config/fileUpload')
const fs = require('fs')
const path = require('path')
const randomstring = require('randomstring')

exports.createExpense = async (req, res) => {
    try {
        // let v = new Validator(req.body, {
        //     total_amount: 'required',
        // })

        // let matched = await v.check()
        // if (!matched) {
        //     return res.status(400).json({
        //         success: false,
        //         message: v.errors
        //     })
        // }
        var expense_dir = "public/expense";
        if (!fs.existsSync(expense_dir)) {
            fs.mkdirSync(expense_dir);
        }

        let expense = []

        if (req.body.attachments.length > 0) {
            for (var o = 0; o <= req.body.attachments.length - 1; o++) {
                var image_type = req.body.attachments[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "expense-" + randomstring.generate();

                await expenseFile.imageUpload(
                    req.body.attachments[o],
                    expense_dir,
                    file_name,
                    image_type
                );
                expense.push(file_name + "." + image_type);
            }
        }
        req.body.attachments = expense
        let query = await ExpenseService.createExpense(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Expense Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllExpense = async (req, res) => {
    try {
        let resultExpense = await pool.query('SELECT * FROM expense_master WHERE is_deleted = $1 ORDER BY expense_id DESC', [false])
        let finalResultExpense = await Pagination.paginator(resultExpense.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultExpense,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editExpense = async (req, res) => {
    try {
        let resultExpense = await pool.query('SELECT * FROM expense_master WHERE expense_id = $1', [req.params.expenseId])
        return res.status(200).json({
            success: true,
            data: resultExpense.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateExpense = async (req, res) => {
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
        let query = await ExpenseService.updateExpense(req.params.expenseId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Expense Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await ExpenseService.deleteExpense(req.params.expenseId)
        return res.status(200).json({
            success: true,
            message: 'Expense Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.cancelExpense = async (req, res) => {
    try {
        await ExpenseService.cancelExpense(req.params.expenseId)
        return res.status(200).json({
            success: true,
            message: 'Expense Cancelled Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.searchExpense = async (req, res) => {
    try {
        let regex = new RegExp(req.body.search, 'i')
        let resultExpense = await pool.query('SELECT * FROM expense_master WHERE payment_type = $1', [regex])
        let finalResultExpense = await Pagination.paginator(resultExpense.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultExpense,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}