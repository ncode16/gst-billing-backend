const { pool } = require('../../config/database')

module.exports = class ShippingAddressService {
    static async createShippingAddress(cols) {
        try {
            var query = ['INSERT INTO shipping_address_master'];
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

    static async updateShippingAddress(id, cols) {
        try {
            var query = ['UPDATE shipping_address_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE shipping_address_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteShippingAddress(id) {
        try {
            return pool.query('UPDATE shipping_address_master SET is_deleted = $1 WHERE shipping_address_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }
}