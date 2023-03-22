const { pool } = require('../../config/database')

module.exports = class FeatureService {
    static async createCategory(categoryName) {
        try {
            let sql = `INSERT INTO category_master (category_name) VALUES ($1) RETURNING *`

            let result = await pool.query(sql, [
                categoryName,
            ])
            return result
        } catch (error) {
            console.log('error', error)
        }
    }

    static async updateCategory(id, cols) {
        try {
            var query = ['UPDATE category_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE category_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteCategory(id) {
        try {
            return pool.query('UPDATE category_master SET is_deleted = $1 WHERE category_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }

    static async activeInactiveCategory(id, isActive) {
        try {
            return pool.query('UPDATE category_master SET is_active = $1 WHERE category_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
        }
    }
}