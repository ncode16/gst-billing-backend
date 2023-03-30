const { pool } = require('../../config/database')

module.exports = class CmsService {
    static async createCms(cmsTitle, cmsDescription, cmsImage) {
        try {
            let sql = `INSERT INTO cms_master (cms_title, cms_description, cms_image) VALUES ($1, $2, $3) RETURNING *`

            let result = await pool.query(sql, [
                cmsTitle,
                cmsDescription,
                cmsImage
            ])
            return result
        } catch (error) {
            console.log('error', error)
        }
    }

    static async updateCms(id, cols) {
        try {
            var query = ['UPDATE cms_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE cms_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteCms(id) {
        try {
            return pool.query('UPDATE cms_master SET is_deleted = $1 WHERE cms_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }

    static async activeInactiveCms(id, isActive) {
        try {
            return pool.query('UPDATE cms_master SET is_active = $1 WHERE cms_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
        }
    }
}