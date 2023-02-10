import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
  process.env.PGDATABASE as string,
  process.env.PGUSER as string,
  process.env.PGPASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
)
