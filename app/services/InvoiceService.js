const { pool } = require('../../config/database')

module.exports = class InvoiceService {
    static async createInvoice(cols) {
        try {
            var query = ['INSERT INTO invoice_master'];
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

    static async updateInvoice(id, cols) {
        try {
            var query = ['UPDATE invoice_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE invoice_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteInvoice(id) {
        try {
            return pool.query('UPDATE invoice_master SET is_deleted = $1 WHERE invoice_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async cancelInvoice(id) {
        try {
            return pool.query('UPDATE invoice_master SET is_cancelled = $1 WHERE invoice_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}