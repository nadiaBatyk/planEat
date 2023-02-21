import { Router } from 'express'
import mealController from '../controllers/mealController'


export interface Meal1  {
  id: number
  name: string
  mealTypeId: number
  mealType?: MealType1
  ingredients: Ingredient1[]
}
export interface MealType1  { id: number; name: string }
export interface Ingredient1  { id: number; name: string }

const mealRoutes = Router()
mealRoutes
  .route('/')
  .get(mealController.getMeals)
  .post(mealController.createMeal)

mealRoutes
  .route('/:id')
  .get<{pepe:number},Meal1>(mealController.getMeal)
  .put(mealController.updateMeal)
  .delete(mealController.deleteMeal)


  export default {
    mealRoutes
  }
  