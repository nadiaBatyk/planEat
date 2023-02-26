import { Router } from 'express'
import { MealController } from '../controllers/mealController'

const mealRoutes = Router()
const mealController = new MealController()

mealRoutes
  .route('/')
  .get(mealController.getMeals)
  .post(mealController.createMeal)

mealRoutes
  .route('/:id')
  .get(mealController.getMealById)
  .put(mealController.updateMeal)
  .delete(mealController.deleteMeal)
mealRoutes.route('/:id/ingredients').get(mealController.getMealIngredient)

export default mealRoutes
