import { Request, Response } from 'express'
import { Meal } from '../models/Meal'
import { MealType } from '../models/MealType'

const getMeals = async (_req: Request, res: Response): Promise<void> => {
  const f = await Meal.findAll(
    {
      include: { model: MealType, as: 'mealType' }
    })
  res.send(f)
}
const getMealTypes = async (_req: Request, res: Response): Promise<void> => {
  const mt = await MealType.findAll()
  res.send(mt)
}
const createType = async (_req: Request, res: Response): Promise<void> => {
  const { name } = _req.body
  const m = await MealType.create({ name })
  console.log(m)
  res.send(m.dataValues)
}
const createMeal = async (_req: Request, res: Response): Promise<void> => {
  const { name, mealTypeId } = _req.body
  const m = await Meal.create({ name, mealTypeId })
  console.log(m)
  res.send(m.dataValues)
}

export default { getMeals, createMeal, getMealTypes, createType }
