import { Request, Response } from 'express'
import { Ingredient } from '../db/models/IngredientClass'
import { Meal1 } from '../db/models/Meal1'
import { MealType1 } from '../db/models/MealType1'
// import { MealIngredient } from '../models/MealIngredientClass'

const getMeals = async (_req: Request, res: Response): Promise<void> => {
  const f = await Meal1.findAll({
    include: [MealType1],
    order: [['id', 'ASC']]
  })
  /*   const g = await m.getIngredients()
  console.log(i.dataValues)
  console.log(g) */
  res.send(f)
}
const getMealTypes = async (_req: Request, res: Response): Promise<void> => {
  const f = await MealType1.findAll({ include: [Meal1] })
  res.send(f)
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
  const m = await MealType1.create({ name })
  console.log(m)
  res.send(m.dataValues)
}
const createMeal = async (_req: Request, res: Response): Promise<Response> => {
  const { name, mealTypeId } = _req.body
  const m = await Meal1.create({
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
