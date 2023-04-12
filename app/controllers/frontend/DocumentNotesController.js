const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const DocumentNotesService = require('../../services/DocumentNotesService')

exports.createDocumentNotes = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            label: 'required',
            notes: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }

        let query = await DocumentNotesService.createDocumentNotes(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Document Notes Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllDocumentNotes = async (req, res) => {
    try {
        let resultDocumentNotes = await pool.query('SELECT * FROM document_notes_master WHERE is_deleted = $1 ORDER BY document_notes_id DESC', [false])
        let finalResultDocumentNotes = await Pagination.paginator(resultDocumentNotes.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultDocumentNotes,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editDocumentNotes = async (req, res) => {
    try {
        let resultDocumentNotes = await pool.query('SELECT * FROM document_notes_master WHERE document_notes_id = $1', [req.params.documentNotesId])
        return res.status(200).json({
            success: true,
            data: resultDocumentNotes.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateDocumentNotes = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            label: 'required',
            notes: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await DocumentNotesService.updateDocumentNotes(req.params.documentNotesId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Document Notes Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteDocumentNotes = async (req, res) => {
    try {
        await DocumentNotesService.deleteDocumentNotes(req.params.documentNotesId)
        return res.status(200).json({
            success: true,
            message: 'Document Notes Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveDocumentNotes = async (req, res) => {
    try {
        await DocumentNotesService.activeInactiveDocumentNotes(req.body.isActive, req.params.documentNotesId)
        if (req.body.isActive == true) {
            return res.status(200).json({
                success: true,
                message: 'Document Notes Activated Successfully'
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Document Notes Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}

exports.defaultDocumentNotes = async (req, res) => {
    try {
        await DocumentNotesService.defaultDocumentNotes(req.body.isDefault, req.params.documentNotesId)
        return res.status(200).json({
            success: true,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}