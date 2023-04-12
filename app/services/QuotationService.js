const { pool } = require('../../config/database')

module.exports = class QuotationService {
    static async createQuotation(cols) {
        try {
            var query = ['INSERT INTO quotation_master'];
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

    static async updateQuotation(id, cols) {
        try {
            var query = ['UPDATE quotation_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE quotation_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteQuotation(id) {
        try {
            return pool.query('UPDATE quotation_master SET is_deleted = $1 WHERE quotation_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
    
    static async cancelQuotation(id) {
        try {
            return pool.query('UPDATE quotation_master SET is_cancelled = $1 WHERE quotation_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}