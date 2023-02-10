import { Pool } from 'pg'

export async function dbConnect (): Promise<void> {
  const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  })
  // await client.connect()

  const res = await pool.query('SELECT * FROM ingredients')

  console.log(res.rows)
  // await client.end()
}
