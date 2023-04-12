const { pool } = require('../../config/database')

module.exports = class VendorService {
    static async createVendor(cols) {
        try {
            var query = ['INSERT INTO vendor_master'];
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

    static async updateVendor(id, cols) {
        try {
            var query = ['UPDATE vendor_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE vendor_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteVendor(id) {
        try {
            return pool.query('UPDATE vendor_master SET is_deleted = $1 WHERE vendor_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async cancelVendor(id) {
        try {
            return pool.query('UPDATE vendor_master SET is_cancelled = $1 WHERE vendor_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}