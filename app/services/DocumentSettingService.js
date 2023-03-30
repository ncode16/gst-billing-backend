const { pool } = require('../../config/database')

module.exports = class DocumentSettingService {
    static async updateDocument(id, cols) {
        try {
            var query = ['UPDATE document_master'];
            query.push('SET');
            var set = [];
            Object.keys(cols).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')');
            });
            query.push(set.join(', '));
            query.push('WHERE document_id = ' + id);
            return query.join(' ');
        } catch (error) {
            console.log('error', error)
        }
    }
}