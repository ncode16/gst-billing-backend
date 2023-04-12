const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const BankService = require('../../services/BankService')

exports.createBank = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            account_number: 'required|same:confirm_account_number',
            ifsc_code: 'required',
            bank_name: 'required',
            branch_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        let query = await BankService.createBank(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Bank Details Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllBank = async (req, res) => {
    try {
        let resultBank = await pool.query('SELECT * FROM bank_master WHERE is_deleted = $1 ORDER BY bank_id DESC', [false])
        let finalResultBank = await Pagination.paginator(resultBank.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultBank,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editBank = async (req, res) => {
    try {
        let resultBank = await pool.query('SELECT * FROM bank_master WHERE bank_id = $1', [req.params.bankId])
        return res.status(200).json({
            success: true,
            data: resultBank.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateBank = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            account_number: 'required|same:confirm_account_number',
            ifsc_code: 'required',
            bank_name: 'required',
            branch_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await BankService.updateBank(req.params.bankId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Bank Details Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteBank = async (req, res) => {
    try {
        await BankService.deleteBank(req.params.bankId)
        return res.status(200).json({
            success: true,
            message: 'Bank Details Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}