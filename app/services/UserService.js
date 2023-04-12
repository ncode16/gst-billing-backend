const { pool } = require('../../config/database')

module.exports = class UserService {
    static async createUser(mobileNumber, otp) {
        try {
            let sql = `INSERT INTO user_master (mobile_number, user_otp) VALUES ($1, $2) RETURNING *`

            let result = await pool.query(sql, [
                mobileNumber,
                otp
            ])
            return result
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async updateUser(id, cols) {
        try {
            var query = ['UPDATE user_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE user_id = ' + id);
            // console.log('cols', query)
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async resendOtp(userId, otp) {
        try {
            return pool.query('UPDATE user_master SET user_otp = $1 WHERE user_id = $2', [otp, userId])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}