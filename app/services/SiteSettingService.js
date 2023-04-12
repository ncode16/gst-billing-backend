const { pool } = require('../../config/database')

module.exports = class SiteSettingService {
    static async createSiteSetting(siteSettingUrl) {
        try {
            let sql = `INSERT INTO site_setting_master (site_setting_url) VALUES ($1) RETURNING *`

            let result = await pool.query(sql, [
                siteSettingUrl,
            ])
            return result
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async updateSiteSetting(id, cols) {
        try {
            var query = ['UPDATE site_setting_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE site_setting_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteSiteSetting(id) {
        try {
            return pool.query('UPDATE site_setting_master SET is_deleted = $1 WHERE site_setting_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async activeInactiveSiteSetting(isActive, id) {
        try {
            return await pool.query('UPDATE site_setting_master SET is_active = $1 WHERE site_setting_id = $2', [isActive, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}