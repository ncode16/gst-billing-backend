const { pool } = require('../../config/database')

module.exports = class ProductService {
    static async createProduct(cols) {
        try {
            var query = ['INSERT INTO product_master'];
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

    static async updateProduct(id, cols) {
        try {
            var query = ['UPDATE product_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE product_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteProduct(id) {
        try {
            return pool.query('UPDATE product_master SET is_deleted = $1 WHERE product_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}