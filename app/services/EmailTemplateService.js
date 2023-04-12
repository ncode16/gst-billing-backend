const { pool } = require('../../config/database')

module.exports = class EmailTemplateService {
    static async createEmailTemplate(cols) {
        try {
            var query = ['INSERT INTO email_template_master'];
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

    static async updateEmailTemplate(id, cols) {
        try {
            var query = ['UPDATE email_template_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE email_template_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteEmailTemplate(id) {
        try {
            return pool.query('UPDATE email_template_master SET is_deleted = $1 WHERE email_template_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async activeInactiveEmailTemplate(id, isActive) {
        try {
            return pool.query('UPDATE email_template_master SET is_active = $1 WHERE email_template_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async defaultEmailTemplate(id, isDefault) {
        try {
            return pool.query('UPDATE email_template_master SET is_default = $1 WHERE email_template_id = $2', [id, isDefault])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}