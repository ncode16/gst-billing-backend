const { pool } = require('../../config/database')

module.exports = class ProductCategoryService {
    static async createProductCategory(cols) {
        try {
            var query = ['INSERT INTO product_category_master'];
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

    static async updateProductCategory(id, cols) {
        try {
            var query = ['UPDATE product_category_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE product_category_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteProductCategory(id) {
        try {
            return pool.query('UPDATE product_category_master SET is_deleted = $1 WHERE product_category_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}