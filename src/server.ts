import express from 'express'
import * as dotenv from 'dotenv'
import { sequelize } from './db/config'
import appRouter from './routes/app.routes'
import { errorHandler } from './middlewares/error.middleware'
import { notFoundHandler } from './middlewares/not-found.middleware'
import swaggerDocs from './common/docs/swagger'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'dev'
async function main(): Promise<void> {
  // MIDDLEWARES
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // ROUTES
  app.use('/api/v1', appRouter)

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ alter: isDev })
    app.listen(PORT, () => {
      console.log(`Succesfully connected to port ${PORT}`)

      swaggerDocs(app, +PORT)

      app.use(errorHandler)
      app.use(notFoundHandler)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    app.on('error', err => console.log(`Error on server: ${err}`))
  }
}

void main()
