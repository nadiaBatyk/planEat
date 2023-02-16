import { Router } from 'express';
import ingredientController from '../controllers/ingredientController';


const ingredientRoutes = Router();

ingredientRoutes
  .route('/ingredients')
  .get(ingredientController.getIngredients)
  .post(ingredientController.createIngredient);

  
/* ingredientRoutes
  .route('/ingredients/:id')
  .get(ingredientController.getIngredient)
  .put(ingredientController.editIngredient)
  .delete(ingredientController.deleteIngredient) */

export default ingredientRoutes;
