const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const FeatureService = require('../../services/FeatureService')

exports.createFeature = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            featureName: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await FeatureService.createFeature(req.body.featureName)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'Feature Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllFeature = async (req, res) => {
    try {
        let resultFeature = await pool.query('SELECT * FROM feature_master WHERE is_deleted = $1 ORDER BY feature_id', [false])
        let finalResultFeature = await Pagination.paginator(resultFeature.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultFeature,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editFeature = async (req, res) => {
    try {
        let resultFeature = await pool.query('SELECT * FROM feature_master WHERE feature_id = $1', [req.params.featureId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultFeature.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateFeature = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            feature_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await FeatureService.updateFeature(req.params.featureId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Feature Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteFeature = async (req, res) => {
    try {
        await FeatureService.deleteFeature(req.params.featureId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Feature Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveFeature = async (req, res) => {
    try {
        await FeatureService.activeInactiveFeature(req.body.isActive, req.params.featureId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Feature Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Feature Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}