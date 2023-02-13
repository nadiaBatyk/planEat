import { Request, Response } from 'express'
import { Meal } from '../models/Meal'
import { MealType } from '../models/MealType'
import { Ingredient } from '../models/Ingredient'
import { MealIngredient } from '../models/MealIngredient'
// import { MealIngredient } from '../models/MealIngredient'

const getMeals = async (_req: Request, res: Response): Promise<void> => {
  const f = await Meal.findAll({
    include: MealType,
    order: [['id', 'ASC']]
  })
  res.send(f)
}
const getMealTypes = async (_req: Request, res: Response): Promise<void> => {
  const mt = await MealType.findAll()
  res.send(mt)
}
const getIngredients = async (_req: Request, res: Response): Promise<void> => {
  const mt = await Ingredient.findAll()
  res.send(mt)
}
const createIngredient = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const { name } = _req.body
  const m = await Ingredient.create({ name })
  console.log(m)
  res.send(m.dataValues)
}
const createType = async (_req: Request, res: Response): Promise<void> => {
  const { name } = _req.body
  const m = await MealType.create({ name })
  console.log(m)
  res.send(m.dataValues)
}
const createMeal = async (_req: Request, res: Response): Promise<Response> => {
  const { hola } = _req.body
  /* const m = await Meal.create({
    name,
    mealTypeId
  })
  console.log(m.dataValues)
  const i = await Ingredient.create({
    name: ingredient.name
  }) */
  const f = {
    mealId: hola.mealId,
    ingredientId: hola.ingreId,
    quantity: hola.quantity,
    unit: hola.unit
  }
  console.log(f)
  const mI = await MealIngredient.create(f)

  return res.send(mI.dataValues)
}

export default {
  getMeals,
  createMeal,
  getMealTypes,
  createType,
  getIngredients,
  createIngredient
}
