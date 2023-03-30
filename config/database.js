const { Client } = require('pg')

let localPoolConfig = {
    user: 'postgres',
    password: 'Mahin@123',
    host: 'localhost',
    port: 5432,
    database: 'local_gst_software'
}

let pool = new Client(localPoolConfig)
pool.connect()
module.exports = { pool }