import * as dotenv from 'dotenv'
import path from 'path'
import { Sequelize } from 'sequelize-typescript'
dotenv.config()

const dbUrl: { [x: string]: string } = {
  development: process.env.DEV_DATABASE_URL as string,
  production: process.env.PROD_DATABASE_URL as string,
}
export const sequelize = new Sequelize(dbUrl[process.env.NODE_ENV as string], {
  models: [path.join(__dirname, '/models')],
})
