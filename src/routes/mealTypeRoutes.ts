import { Router } from 'express'
import mealTypeController from '../controllers/mealTypeController'

const mealTypeRoutes = Router()

mealTypeRoutes
  .route('/')
  .get(mealTypeController.getMealTypes)
  .post(mealTypeController.createType)

mealTypeRoutes
  .route('/:id')
  .get(mealTypeController.getMealType)
  .put(mealTypeController.updateMealType)
  .delete(mealTypeController.deleteMealType)

export default mealTypeRoutes
