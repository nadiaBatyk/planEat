import { Router } from 'express'
import { IngredientController } from '../controllers/ingredientController'

const ingredientRoutes = Router()
const ingredientController = new IngredientController()
ingredientRoutes
  .route('/')
  .get(ingredientController.getIngredients)
  .post(ingredientController.createIngredient)

ingredientRoutes
  .route('/:id')
  .get(ingredientController.getIngredientById)
  .put(ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient)

export default ingredientRoutes
