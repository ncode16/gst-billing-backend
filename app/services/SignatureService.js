const { pool } = require('../../config/database')

module.exports = class signatureService {
    static async createSignature(cols) {
        try {
            var query = ['INSERT INTO signature_master'];
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

    static async updateSignature(id, cols) {
        try {
            var query = ['UPDATE signature_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE signature_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteSignature(id) {
        try {
            return pool.query('UPDATE signature_master SET is_deleted = $1 WHERE signature_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}