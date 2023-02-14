import { Request, Response } from 'express'
import { Meal } from '../models/MealClass'
import { MealType } from '../models/MealTypeClass'
import { Ingredient } from '../models/IngredientClass'
// import { MealIngredient } from '../models/MealIngredientClass'

const getMeals = async (_req: Request, res: Response): Promise<void> => {
  const f = await Meal.findAll({
    include: [MealType, Ingredient],
    order: [['id', 'ASC']]
  })
  /*   const g = await m.getIngredients()
  console.log(i.dataValues)
  console.log(g) */
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
  const { name, unit } = _req.body
  const m = await Ingredient.create({ name, unit })
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
  const { name, mealTypeId } = _req.body
  const m = await Meal.create({
    name,
    mealTypeId
  })
  console.log(m.dataValues)
  /*   const i = await Ingredient.create({
    name: ingredient.name,
    unit: ingredient.unit
  }) */

  return res.send(m.dataValues)
}

export default {
  getMeals,
  createMeal,
  getMealTypes,
  createType,
  getIngredients,
  createIngredient
}
