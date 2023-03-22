const { Client } = require('pg')

let localPoolConfig = {
    user: 'gst_billing_software_user',
    password: 'Mahin@123',
    host: 'uH1LGuNaBylWbRAZY8NptfEUnxKq5pVk',
    port: 5432,
    database: 'gst_billing_software'
}

let pool = new Client(localPoolConfig)
pool.connect()
module.exports = { pool }