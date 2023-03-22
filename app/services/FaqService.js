const { pool } = require('../../config/database')

module.exports = class FeatureService {
    static async createFaq(title, description) {
        try {
            let sql = `INSERT INTO faq_master (title, description) VALUES ($1, $2) RETURNING *`

            let result = await pool.query(sql, [
                title,
                description,
            ])
            return result
        } catch (error) {
            console.log('error', error)
        }
    }

    static async updateFaq(id, cols) {
        try {
            var query = ['UPDATE faq_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE faq_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteFaq(id) {
        try {
            return pool.query('UPDATE faq_master SET is_deleted = $1 WHERE faq_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }

    static async activeInactiveFaq(id, isActive) {
        try {
            return pool.query('UPDATE faq_master SET is_active = $1 WHERE faq_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
        }
    }
}