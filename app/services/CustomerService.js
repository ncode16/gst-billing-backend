const { pool } = require('../../config/database')

module.exports = class CustomerService {
    static async createCustomer(cols) {
        try {
            var query = ['INSERT INTO customer_master'];
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

    static async updateCustomer(id, cols) {
        try {
            var query = ['UPDATE customer_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE customer_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteCustomer(id) {
        try {
            return pool.query('UPDATE customer_master SET is_deleted = $1 WHERE customer_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}