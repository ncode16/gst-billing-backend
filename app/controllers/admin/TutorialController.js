const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const TutorialService = require('../../services/TutorialService')

exports.createTutorial = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            tutorialTitle: 'required',
            tutorialLink: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let resultTutorial = await TutorialService.createTutorial(req.body.tutorialTitle, req.body.tutorialLink, req.body.categoryId)

        return res.json({
            statusCode: 200,
            success: true,
            data: resultTutorial.rows[0],
            message: 'Tutorial Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllTutorial = async (req, res) => {
    try {
        let resultTutorial = await pool.query('SELECT * FROM tutorial_master WHERE is_deleted = $1 ORDER BY tutorial_id', [false])
        let finalResultTutorial = await Pagination.paginator(resultTutorial.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultTutorial,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editTutorial = async (req, res) => {
    try {
        let resultTutorial = await pool.query('SELECT * FROM tutorial_master WHERE tutorial_id = $1', [req.params.tutorialId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultTutorial.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateTutorial = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            tutorial_title: 'required',
            tutorial_link: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await TutorialService.updateTutorial(req.params.tutorialId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Tutorial Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteTutorial = async (req, res) => {
    try {
        await TutorialService.deleteTutorial(req.params.tutorialId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Tutorial Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveTutorial = async (req, res) => {
    try {
        await TutorialService.activeInactiveTutorial(req.body.isActive, req.params.tutorialId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Tutorial Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Tutorial Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}