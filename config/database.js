const { Client } = require('pg')

let localPoolConfig = {
    user: 'gst_billing_software_user',
    password: 'uH1LGuNaBylWbRAZY8NptfEUnxKq5pVk',
    host: 'dpg-cgcko2m4dad6fr5evfdg-a',
    port: 5432,
    database: 'gst_billing_software'
}

let pool = new Client(localPoolConfig)
pool.connect()
module.exports = { pool }