/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express from 'express'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { sequelize } from './db/db'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Meal } from './models/Meal'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MealType } from './models/MealType'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MealFeature } from './models/MealFeature'
import { MealIngredient } from './models/MealIngredient'
dotenv.config()
const app = express()

const PORT = process.env.PORT

async function main (): Promise<void> {
  try {
    console.log(Meal)
    console.log(MealType)
    console.log(MealFeature)
    console.log(MealIngredient)

    /* // MIDDLEWARES
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // ROUTES
    app.get('/meals', (_req, res) => {
      console.log('piden comidas')

      res.send('Estas son tus comidas')
    }) */
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true })
    app.listen(PORT, () => {
      console.log(`Succesfully connected to port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    app.on('error', (err) => console.log(`Error on server: ${err}`))
  }
}

void main()
