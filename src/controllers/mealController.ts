import { Request, Response } from 'express'
import { Meal } from '../db/models/Meal'
import { MealType } from '../db/models/MealType'
import { Ingredient } from '../db/models/Ingredient'
import { MealIngredient } from '../db/models/MealIngredient'

const getMeals = async (_req: Request, res: Response): Promise<void> => {
  const f = await Meal.findAll({
    include: [MealType, Ingredient],
    order: [['id', 'ASC']],
  })
  /*   const g = await m.getIngredients()
  console.log(i.dataValues)
  console.log(g) */
  res.send(f)
}

const createMeal = async (_req: Request, res: Response): Promise<Response> => {
  const { name, mealTypeId, ingredient } = _req.body
  const m = await Meal.create({
    name,
    mealTypeId,
  })
  console.log(m.dataValues)
  const i = await Ingredient.create({
    name: ingredient.name,
    unit: ingredient.unit,
  })
  await m.$add('ingredient', i, {
    through: { model: MealIngredient, quantity: ingredient.quantity },
  })

  return res.send(m.dataValues)
}
const editMeal = async (_req: Request, res: Response): Promise<void> => {
  const { ingredients } = _req.body
  const { id } = _req.params
  const m = await Meal.findByPk(id)
  ingredients.forEach(async (i: { id: number; quantity: number }) => {
    await m?.$add('ingredients', i.id, {
      through: { model: MealIngredient, quantity: i.quantity },
    })
  })
  console.log(m)
  res.send(m?.dataValues)
}

export default {
  getMeals,
  createMeal,
  editMeal,
}
