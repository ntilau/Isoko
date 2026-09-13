const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smergers_clone',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
})

async function testConnection() {
  let client
  try {
    client = await pool.connect()
    console.log('Database connection successful!')

    // Test a simple query
    const result = await client.query('SELECT NOW()')
    console.log('Current time:', result.rows[0])

    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  } finally {
    if (client) {
      client.release()
    }
    await pool.end()
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1)
})