const { pool } = require('../../config/database')

module.exports = class FeatureService {
    static async createAboutus(aboutusTitle, aboutusDescription) {
        try {
            let sql = `INSERT INTO aboutus_master (aboutus_title, aboutus_description) VALUES ($1, $2) RETURNING *`

        let result = await pool.query(sql, [
            aboutusTitle,
            aboutusDescription,
        ])
            return result
        } catch (error) {
            console.log('error', error)
        }
    }

    static async updateAboutus(id, cols) {
        try {
            var query = ['UPDATE aboutus_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE aboutus_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteAboutus(id) {
        try {
            return pool.query('UPDATE aboutus_master SET is_deleted = $1 WHERE aboutus_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }

    static async activeInactiveAboutus(id, isActive) {
        try {
            return pool.query('UPDATE aboutus_master SET is_active = $1 WHERE aboutus_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
        }
    }
}