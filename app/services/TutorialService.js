const { pool } = require('../../config/database')

module.exports = class TutorialService {
    static async createTutorial(tutorialTitle, tutorialLink, categoryId) {
        try {
            let sql = `INSERT INTO tutorial_master (tutorial_title, tutorial_link, category_id) VALUES ($1, $2, $3) RETURNING *`

            let result = await pool.query(sql, [
                tutorialTitle,
                tutorialLink,
                categoryId
            ])
            return result
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async updateTutorial(id, cols) {
        try {
            var query = ['UPDATE tutorial_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE tutorial_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async deleteTutorial(id) {
        try {
            return pool.query('UPDATE tutorial_master SET is_deleted = $1 WHERE tutorial_id = $2', [true, id])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }

    static async activeInactiveTutorial(id, isActive) {
        try {
            return pool.query('UPDATE tutorial_master SET is_active = $1 WHERE tutorial_id = $2', [id, isActive])
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }
}