import { Router } from 'express'


export interface Meal1  {
  id: number
  name: string
  mealTypeId: number
  mealType?: MealType1
  ingredients: Ingredient1[]
}
export interface MealType1  { id: number; name: string }
export interface Ingredient1  { id: number; name: string }

export class MealRoutes {
  mealRoutes = Router();
  this.mealRoutes
  .route('/')
  .get(mealController.getMeals)
  .post(mealController.createMeal)

mealRoutes
  .route('/:id')
  .get(mealController.getMeal)
  .put(mealController.updateMeal)
  .delete(mealController.deleteMeal)

}

const mealRoutes = Router()


  export default {
    mealRoutes
  }
  