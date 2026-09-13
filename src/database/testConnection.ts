import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smergers_clone',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
})

async function testConnection() {
  try {
    const client = await pool.connect()
    console.log('Database connection successful!')

    // Test a simple query
    const result = await client.query('SELECT NOW()')
    console.log('Current time:', result.rows[0])

    client.release()
    await pool.end()
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    await pool.end()
    return false
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1)
})