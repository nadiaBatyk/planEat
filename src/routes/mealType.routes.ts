import { Router } from 'express'
import { MealTypeController } from '../controllers/mealType.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import {
  MealTypeSchema,
  PartialMealTypeSchema,
} from '../middlewares/validation/schemas/mealType.schema'

const mealTypeRoutes = Router()
const mealTypeController = new MealTypeController()

mealTypeRoutes
  .route('/')
  .get(mealTypeController.getMealTypes)
  .post(validate(MealTypeSchema), mealTypeController.createType)

mealTypeRoutes
  .route('/:id')
  .get(mealTypeController.getMealTypeById)
  .put(validate(PartialMealTypeSchema), mealTypeController.updateMealType)
  .delete(mealTypeController.deleteMealType)

mealTypeRoutes.route('/:id/meals').get(mealTypeController.getMealsInType)

export default mealTypeRoutes
