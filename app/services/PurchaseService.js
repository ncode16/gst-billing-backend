const { pool } = require('../../config/database')

module.exports = class PurchaseService {
    static async createPurchase(cols) {
        try {
            var query = ['INSERT INTO purchase_master'];
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

    static async updatePurchase(id, cols) {
        try {
            var query = ['UPDATE purchase_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE purchase_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deletePurchase(id) {
        try {
            return pool.query('UPDATE purchase_master SET is_deleted = $1 WHERE purchase_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async cancelPurchase(id) {
        try {
            return pool.query('UPDATE purchase_master SET is_cancelled = $1 WHERE purchase_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}