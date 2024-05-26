const mysql = require('mysql')
const util = require('util')
const dotenv = require('dotenv')

dotenv.config()

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dentist_appointment',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const query = util.promisify(db.query).bind(db)

module.exports = {
    db,
    query
}