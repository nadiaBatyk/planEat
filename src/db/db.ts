// import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import { Meal1 } from './models/Meal1'
import { MealType1 } from './models/MealType1'
import { Ingredient1 } from './models/Ingredient1'
import { MealIngredient1 } from './models/MealIngredient1'

export const sequelize = new Sequelize({
  database: process.env.PGDATABASE as string,
  dialect: 'postgres',
  username: process.env.PGUSER as string,
  password: process.env.PGPASSWORD,
  storage: process.env.PGHOST,
  models: [Meal1, MealType1, Ingredient1, MealIngredient1]
})
