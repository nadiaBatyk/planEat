import path from 'path'
import { Sequelize } from 'sequelize-typescript'

// export const sequelize = new Sequelize({
//   database: process.env.PGDATABASE as string,
//   dialect: 'postgres',
//   username: process.env.PGUSER as string,
//   password: process.env.PGPASSWORD,
//   storage: process.env.PGHOST,
//   models: [path.join(__dirname, '/models')],
// })
export const sequelize = new Sequelize(
  process.env.PROD_DATABASE_URL as string,
  { models: [path.join(__dirname, '/models')] }
)
