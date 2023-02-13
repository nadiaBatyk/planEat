import { Router } from 'express'
import mealController from '../controllers/mealController'

const mealRoutes = Router()
// eslint-disable-next-line @typescript-eslint/no-misused-promises
mealRoutes.route('/meals').get(mealController.getMeals).post(mealController.createMeal)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
mealRoutes.route('/mealTypes').get(mealController.getMealTypes).post(mealController.createType)
mealRoutes.route('/meals/:id').get().put().delete()

export default mealRoutes
