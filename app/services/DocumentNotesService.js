const { pool } = require('../../config/database')

module.exports = class DocumentNotesService {
    static async createDocumentNotes(cols) {
        try {
            var query = ['INSERT INTO document_notes_master'];
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(`(${key})` + ' VALUES ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('RETURNING *');
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async updateDocumentNotes(id, cols) {
        try {
            var query = ['UPDATE document_notes_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE document_notes_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteDocumentNotes(id) {
        try {
            return pool.query('UPDATE document_notes_master SET is_deleted = $1 WHERE document_notes_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async activeInactiveDocumentNotes(id, isActive) {
        try {
            return pool.query('UPDATE document_notes_master SET is_active = $1 WHERE document_notes_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async defaultDocumentNotes(id, isDefault) {
        try {
            return pool.query('UPDATE document_notes_master SET is_default = $1 WHERE document_notes_id = $2', [id, isDefault])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}