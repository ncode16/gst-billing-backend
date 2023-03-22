const { pool } = require('../../config/database')

module.exports = class ContactService {
    static async createContactUs(contactName, contactPhone, contactMessage, contactEmail, contactCountry, contactCity) {
        try {
            let sql = `INSERT INTO contact_master (contact_name, contact_phone, contact_email, contact_country, contact_city, contact_message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

            let result = await pool.query(sql, [
                contactName,
                contactPhone,
                contactEmail,
                contactCountry,
                contactCity,
                contactMessage
            ])
            return result
        } catch (error) {
            console.log('error', error)
        }
    }

    static async updateContactUs(id, cols) {
        try {
            var query = ['UPDATE contact_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE contact_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteContactUs(id) {
        try {
            await pool.query('UPDATE contact_master SET is_deleted = $1 WHERE contact_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }

    static async activeInactiveContactUs(id, isActive) {
        try {
            await pool.query('UPDATE contact_master SET is_active = $1 WHERE contact_id = $2', [isActive, id])
        } catch (error) {
            console.log('error', error)
        }
    }
}