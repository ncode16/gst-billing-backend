const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const CompanyService = require('../../services/CompanyService')

exports.createCompany = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            trade_name: 'required',
            company_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        let query = await CompanyService.createCompany(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Company Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllCompany = async (req, res) => {
    try {
        let resultCompany = await pool.query('SELECT * FROM company_master WHERE is_deleted = $1 ORDER BY company_id DESC', [false])
        let finalResultCompany = await Pagination.paginator(resultCompany.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultCompany,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editCompany = async (req, res) => {
    try {
        let resultCompany = await pool.query('SELECT * FROM company_master WHERE company_id = $1', [req.params.companyId])
        return res.status(200).json({
            success: true,
            data: resultCompany.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateCompany = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            trade_name: 'required',
            company_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await CompanyService.updateCompany(req.params.companyId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Company Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}