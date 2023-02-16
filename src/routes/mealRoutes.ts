import { Router } from 'express';
import mealController from '../controllers/mealController';


const mealRoutes = Router();
mealRoutes
  .route('/meals')
  .get(mealController.getMeals)
  .post(mealController.createMeal);

mealRoutes
  .route('/ingredients')
  .get(mealController.getIngredients)
  .post(mealController.createIngredient);

mealRoutes.route('/meals/:id').get().put(mealController.editMeal).delete();

export default mealRoutes;
