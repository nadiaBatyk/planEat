import { Router } from 'express'
import { IngredientController } from '../controllers/ingredient.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import {
  IngredientSchema,
  PartialIngredientSchema,
} from '../middlewares/validation/schemas/ingredient.schema'

const ingredientRoutes = Router()
const ingredientController = new IngredientController()
ingredientRoutes
  .route('/')
  .get(ingredientController.getIngredients)
  .post(validate(IngredientSchema), ingredientController.createIngredient)

ingredientRoutes
  .route('/:id')
  .get(ingredientController.getIngredientById)
  .put(validate(PartialIngredientSchema), ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient)

export default ingredientRoutes
