import { Router } from 'express'
import mealTypeController from '../controllers/mealTypeController'

const mealTypeRoutes = Router()

mealTypeRoutes
  .route('/mealTypes')
  .get(mealTypeController.getMealTypes)
  .post(mealTypeController.createType)

/* mealTypeRoutes
  .route('/mealTypes/:id')
  .get(mealTypeController.getMealType)
  .put(mealTypeController.editMealType)
  .delete(mealTypeController.deleteMealType) */

export default mealTypeRoutes
