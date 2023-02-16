import { Router } from 'express'
import mealController from '../controllers/mealController'

const mealRoutes = Router()
mealRoutes
  .route('/')
  .get(mealController.getMeals)
  .post(mealController.createMeal)

mealRoutes
  .route('/:id')
  .get(mealController.getMeal)
  .put(mealController.updateMeal)
  .delete(mealController.deleteMeal)

export default mealRoutes
