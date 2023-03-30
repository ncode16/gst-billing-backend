const { pool } = require('../../config/database')

module.exports = class BillingAddressService {
    static async createBillingAddress(cols) {
        try {
            var query = ['INSERT INTO billing_address_master'];
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

    static async updateBillingAddress(id, cols) {
        try {
            var query = ['UPDATE billing_address_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE billing_address_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteBillingAddress(id) {
        try {
            return pool.query('UPDATE billing_address_master SET is_deleted = $1 WHERE billing_address_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }
}