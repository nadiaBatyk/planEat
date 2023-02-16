import { Request, Response } from 'express'
import { Meal } from '../db/models/Meal'
import { Ingredient } from '../db/models/Ingredient'

const getIngredients = async (_req: Request, res: Response): Promise<void> => {
  const f = await Ingredient.findAll({ include: [Meal] })
  res.send(f)
}
const getIngredient = async (_req: Request, res: Response): Promise<void> => {
  const f = await Ingredient.findAll({ include: [Meal] })
  res.send(f)
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
const updateIngredient = async (_req: Request, res: Response): Promise<void> => {
  const f = await Ingredient.findAll({ include: [Meal] })
  res.send(f)
}
const deleteIngredient = async (_req: Request, res: Response): Promise<void> => {
  const f = await Ingredient.findAll({ include: [Meal] })
  res.send(f)
}

export default {
  getIngredients,
  createIngredient,
  getIngredient,
  updateIngredient,
  deleteIngredient
}
