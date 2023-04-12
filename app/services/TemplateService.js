const { pool } = require('../../config/database')

module.exports = class TemplateService {
    static async createTemplate(templateName, file) {
        try {
            let sql = `INSERT INTO template_master (template_name, template_image) VALUES ($1, $2) RETURNING *`
            let result = await pool.query(sql, [
                templateName,
                file,
            ])
            return result
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async updateTemplate(id, cols) {
        try {
            var query = ['UPDATE template_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE template_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteTemplate(id) {
        try {
            return pool.query('UPDATE template_master SET is_deleted = $1 WHERE template_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async activeInactiveTemplate(id, isActive) {
        try {
            return pool.query('UPDATE template_master SET is_active = $1 WHERE template_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}