import { Router } from 'express'
import { MealController } from '../controllers/meal.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { MealSchema } from '../middlewares/validation/schemas/meal.schema'
import { MealIngredientSchema } from '../middlewares/validation/schemas/mealIngredient.schema'

const mealRoutes = Router()
const mealController = new MealController()

mealRoutes
  .route('/')
  .get(mealController.getMeals)
  .post(validate(MealSchema), mealController.createMeal)

mealRoutes
  .route('/:id')
  .get(mealController.getMealById)
  .put(validate(MealSchema), mealController.updateMeal)
  .delete(mealController.deleteMeal)
mealRoutes
  .route('/:mealId/ingredients')
  .get(mealController.getMealIngredients)
  .post(validate(MealIngredientSchema), mealController.addMealIngredient)

mealRoutes
  .route('/:mealId/ingredients/:ingredientId')
  .get(mealController.getMealIngredientById)
  .put(validate(MealIngredientSchema), mealController.addMealIngredient)
  .delete(mealController.deleteMealIngredient)

mealRoutes
  .route('/:mealId/features')
  .get(mealController.getMealFeatures)
  .post(mealController.addMealFeature)

mealRoutes
  .route('/:mealId/features/:featureId')
  .get(mealController.getMealFeatureById)
  .put(mealController.addMealFeature)
  .delete(mealController.deleteMealFeature)
export default mealRoutes
