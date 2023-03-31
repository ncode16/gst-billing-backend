const { pool } = require('../../config/database')

module.exports = class ExpenseService {
    static async createExpense(cols) {
        try {
            var query = ['INSERT INTO Expense_master'];
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

    static async updateExpense(id, cols) {
        try {
            var query = ['UPDATE expense_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE expense_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }

    static async deleteExpense(id) {
        try {
            return pool.query('UPDATE expense_master SET is_deleted = $1 WHERE expense_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
        }
    }
}