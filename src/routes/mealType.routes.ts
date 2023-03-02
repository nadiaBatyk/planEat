import { Router } from 'express'
import { MealTypeController } from '../controllers/mealType.controller'

const mealTypeRoutes = Router()
const mealTypeController = new MealTypeController()

mealTypeRoutes
  .route('/')
  .get(mealTypeController.getMealTypes)
  .post(mealTypeController.createType)

mealTypeRoutes
  .route('/:id')
  .get(mealTypeController.getMealTypeById)
  .put(mealTypeController.updateMealType)
  .delete(mealTypeController.deleteMealType)

mealTypeRoutes.route('/:id/meals').get(mealTypeController.getMealsInType)

export default mealTypeRoutes
