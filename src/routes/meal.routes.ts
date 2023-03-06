import { Router } from 'express'
import { MealController } from '../controllers/meal.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { MealSchema } from '../middlewares/validation/schemas/meal.schema'
import { MealFeatureSchema } from '../middlewares/validation/schemas/mealFeature.schema'
import { MealIngredientSchema } from '../middlewares/validation/schemas/mealIngredient.schema'

const mealRoutes = Router()
const mealController = new MealController()

/**
 * @openapi
 *  /api/v1/meals:
 *   get:
 *     tags:
 *       - Meals
 *     summary: Find all meals
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MealDTOResponse"
 *   post:
 *     tags:
 *       - Meals
 *     summary: Add a new meal
 *     requestBody:
 *       description: Create a new meal
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New meal successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Invalid input
 */
mealRoutes
  .route('/')
  .get(mealController.getMeals)
  .post(validate(MealSchema), mealController.createMeal)

/**
 * @openapi
 *  /api/v1/meals/{mealId}:
 *   get:
 *     tags:
 *       - Meals
 *     summary: Find meal by Id
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: meal not found
 *   put:
 *     tags:
 *       - Meals
 *     summary: Updates an existing meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *     requestBody:
 *       description: Update a meal
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New meal successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Meals
 *     summary: Deletes an existing meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *     responses:
 *       200:
 *         description: OK - New meal successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: meal not found
 */
mealRoutes
  .route('/:mealId')
  .get(mealController.getMealById)
  .put(validate(MealSchema), mealController.updateMeal)
  .delete(mealController.deleteMeal)

/**
 * @openapi
 *  /api/v1/meals/{mealId}/ingredients:
 *   get:
 *     tags:
 *       - Meals
 *     summary: Find all ingredients in one meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/IngredientDTOResponse"
 *   post:
 *     tags:
 *       - Meals
 *     summary: Add an ingredient to a meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *     requestBody:
 *       description: Add an ingredient to a meal
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealIngredientDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New ingredient successfully added to meal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Invalid input
 */
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
  .post(validate(MealFeatureSchema), mealController.addMealFeature)

mealRoutes
  .route('/:mealId/features/:featureId')
  .get(mealController.getMealFeatureById)
  .put(validate(MealFeatureSchema), mealController.addMealFeature)
  .delete(mealController.deleteMealFeature)
export default mealRoutes
