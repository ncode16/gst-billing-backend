const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const DocumentSettingService = require('../../services/DocumentSettingService')

exports.getDocumentSetting = async(req, res) => {
    try {
        let getDocument = await pool.query('SELECT * FROM document_master WHERE document_id = $1', [req.params.documentId])
        return res.status(200).json({
            success: true,
            data: getDocument.rows[0],
            message: 'Data Retrived successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateDocument = async (req, res) => {
    try {
        let query = await DocumentSettingService.updateDocument(req.params.documentId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Document Setting Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}