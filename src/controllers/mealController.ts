import { Request, Response } from 'express'
import { Ingredient } from '../db/models/IngredientClass'
import { Meal1 } from '../db/models/Meal1'
import { MealType1 } from '../db/models/MealType1'
import { Ingredient1 } from '../db/models/Ingredient1'
import { MealIngredient1 } from '../db/models/MealIngredient1'
// import { MealIngredient } from '../models/MealIngredientClass'

const getMeals = async (_req: Request, res: Response): Promise<void> => {
  const f = await Meal1.findAll({
    include: [MealType1, Ingredient1],
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
  const mt = await Ingredient1.findAll()
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
  const { name, mealTypeId, ingredient } = _req.body
  const m = await Meal1.create({
    name,
    mealTypeId
  })
  console.log(m.dataValues)
  const i = await Ingredient1.create({
    name: ingredient.name,
    unit: ingredient.unit
  })
  await m.$add('ingredient', i, { through: { model: MealIngredient1, quantity: ingredient.quantity } })

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
