const { pool } = require('../../config/database')

module.exports = class FeatureService {
    static async createFeature(featureName) {
        try {
            let sql = `INSERT INTO feature_master (feature_name) VALUES ($1) RETURNING *`

            let result = await pool.query(sql, [
                featureName,
            ])
            return result
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async updateFeature(id, cols) {
        try {
            var query = ['UPDATE feature_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE feature_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteFeature(id) {
        try {
            return pool.query('UPDATE feature_master SET is_deleted = $1 WHERE feature_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async activeInactiveFeature(isActive, id) {
        try {
            return pool.query(`UPDATE "feature_master" SET "is_active" = $1 WHERE "feature_id" = $2`, [isActive, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}