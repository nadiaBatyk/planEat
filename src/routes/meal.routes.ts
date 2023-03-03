import { Router } from 'express'
import { MealController } from '../controllers/meal.controller'

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
mealRoutes
  .route('/:mealId/ingredients')
  .get(mealController.getMealIngredients)
  .post(mealController.addMealIngredient)

mealRoutes
  .route('/:mealId/ingredients/:ingredientId')
  .get(mealController.getMealIngredientById)
  .put(mealController.addMealIngredient)
  .delete(mealController.deleteMealIngredient)

mealRoutes.route('/:id/features').get(mealController.getMealFeatures)
export default mealRoutes
