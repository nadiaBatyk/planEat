import { Request, Response } from 'express'
import { Meal } from '../db/models/Meal'
import { MealType } from '../db/models/MealType'
import { Ingredient } from '../db/models/Ingredient'
import { MealIngredient } from '../db/models/MealIngredient'
import mealService from '../services/mealService'
import { Meal1 } from '../routes/mealRoutes'



const getMeals = async (_req: Request, res: Response): Promise<void> => {
  // const meals = await mealService.getMeals()
  // console.log(meals)
console.log('holaaaa');

  const f = await Meal.findAll({
    include: [MealType, Ingredient],
    order: [['id', 'ASC']],
  })
  /*   const g = await m.getIngredients()
  console.log(i.dataValues)
  console.log(g) */
  res.send(f)
}
const getMeal = async (_req: Request<{pepe:number}>, res: Response<Meal1>): Promise<void> => {
  const meal = await mealService.getMeal()
  console.log(meal);
  const g = _req.params.pepe
  const f = await Meal.findByPk(g,{
    include: [MealType, Ingredient],
    order: [['id', 'ASC']],
  })
  /*   const g = await m.getIngredients()
  console.log(i.dataValues)
  console.log(g) */
  res.send(f as Meal1)
}

const createMeal = async (_req: Request, res: Response): Promise<Response> => {
  const meal = await mealService.createMeal()
  console.log(meal);
  const { name, mealTypeId } = _req.body
  const m = await Meal.create({
    name,
    mealTypeId,
  })
  console.log(m.dataValues)
  /* const i = await Ingredient.create({
    name: ingredient.name,
    unit: ingredient.unit,
  })
  await m.$add('ingredient', i, {
    through: { model: MealIngredient, quantity: ingredient.quantity },
  }) */

  return res.send(m.dataValues)
}
const updateMeal = async (_req: Request, res: Response): Promise<void> => {
  const meal = await mealService.updateMeal()
  console.log(meal);
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
const deleteMeal = async (_req: Request, res: Response): Promise<void> => {
  const { id } = _req.params
  const meal = await mealService.deleteMeal(+id)
  console.log(meal);
  const f = await Meal.findAll({
    include: [MealType, Ingredient],
    order: [['id', 'ASC']],
  })
  /*   const g = await m.getIngredients()
  console.log(i.dataValues)
  console.log(g) */
  res.send(f)
}
export default {
  getMeals,
  createMeal,
  updateMeal,
  getMeal,
  deleteMeal,
}
