import { Router } from 'express'
import ingredientController from '../controllers/ingredientController'

const ingredientRoutes = Router()

ingredientRoutes
  .route('/')
  .get(ingredientController.getIngredients)
  .post(ingredientController.createIngredient)

ingredientRoutes
  .route('/:id')
  .get(ingredientController.getIngredient)
  .put(ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient)

export default ingredientRoutes
