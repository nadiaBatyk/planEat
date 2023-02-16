import { Request, Response } from 'express'
import { Meal } from '../db/models/Meal'
import { MealType } from '../db/models/MealType'

const getMealTypes = async (_req: Request, res: Response): Promise<void> => {
  const f = await MealType.findAll({ include: [Meal] })
  res.send(f)
}
const createType = async (_req: Request, res: Response): Promise<void> => {
  const { name } = _req.body
  const m = await MealType.create({ name })
  console.log(m)
  res.send(m.dataValues)
}

export default {
  getMealTypes,
  createType,
}
