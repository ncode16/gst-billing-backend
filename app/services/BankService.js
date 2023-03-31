const { pool } = require('../../config/database')

module.exports = class BankService {
    static async createBank(cols) {
        try {
            var query = ['INSERT INTO bank_master'];
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(`(${key})` + ' VALUES ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('RETURNING *');
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async updateBank(id, cols) {
        try {
            var query = ['UPDATE bank_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE bank_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteBank(id) {
        try {
            return pool.query('UPDATE bank_master SET is_deleted = $1 WHERE bank_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }
}