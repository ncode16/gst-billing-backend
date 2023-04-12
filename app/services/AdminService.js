const { pool } = require('../../config/database')

module.exports = class AdminService {
    static async createUser(cols) {
        try {
            var query = ['INSERT INTO user_master'];
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(`(${key})` + ' VALUES ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('RETURNING *');
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }
}