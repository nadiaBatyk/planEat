import { Router } from 'express'
import { MealController } from '../controllers/meal.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { mealSchema } from '../middlewares/validation/schemas/meal.schema'
import { mealFeatureSchema } from '../middlewares/validation/schemas/mealFeature.schema'
import { mealIngredientSchema } from '../middlewares/validation/schemas/mealIngredient.schema'
import { queryHandler } from '../middlewares/query.middleware'

const mealRoutes = Router()
const mealController = new MealController()

/**
 * @openapi
 *  /api/v1/meals:
 *   get:
 *     tags:
 *       - Meals
 *     summary: Find all meals
 *     parameters:
 *      - $ref: "#/components/parameters/pageNumber"
 *      - $ref: "#/components/parameters/pageSize"
 *      - $ref: "#/components/parameters/orderBy"
 *      - $ref: "#/components/parameters/direction"
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
  .get(queryHandler, mealController.getMeals)
  .post(validate(mealSchema), mealController.createMeal)

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
  .put(validate(mealSchema), mealController.updateMeal)
  .delete(mealController.deleteMeal)

/**
 * @openapi
 *  /api/v1/meals/{mealId}/ingredients:
 *   get:
 *     tags:
 *       - Meal Ingredients
 *     summary: Find all ingredients in one meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/pageNumber"
 *      - $ref: "#/components/parameters/pageSize"
 *      - $ref: "#/components/parameters/orderBy"
 *      - $ref: "#/components/parameters/direction"
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
 *       - Meal Ingredients
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
  .get(queryHandler, mealController.getMealIngredients)
  .post(validate(mealIngredientSchema), mealController.addMealIngredient)

/**
 * @openapi
 *  /api/v1/meals/{mealId}/ingredients/{ingredientId}:
 *   get:
 *     tags:
 *       - Meal Ingredients
 *     summary: Find meal ingredient by Id
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/ingredientId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealIngredientDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: meal not found
 *   put:
 *     tags:
 *       - Meal Ingredients
 *     summary: Updates the quantity of an existent ingredient in meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/ingredientId"
 *     requestBody:
 *       description: Update a meal ingredient
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealIngredientDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - Ingredient in meal successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Meal Ingredients
 *     summary: Deletes an existing meal ingredient
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/ingredientId"
 *     responses:
 *       200:
 *         description: OK - Meal ingredient successfully deleted
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
  .route('/:mealId/ingredients/:ingredientId')
  .get(mealController.getMealIngredientById)
  .put(validate(mealIngredientSchema), mealController.updateMealIngredient)
  .delete(mealController.deleteMealIngredient)

/**
 * @openapi
 *  /api/v1/meals/{mealId}/features:
 *   get:
 *     tags:
 *       - Meal features
 *     summary: Find all features in one meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/pageNumber"
 *      - $ref: "#/components/parameters/pageSize"
 *      - $ref: "#/components/parameters/orderBy"
 *      - $ref: "#/components/parameters/direction"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/FeatureDTOResponse"
 *   post:
 *     tags:
 *       - Meal features
 *     summary: Add a feature to a meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *     requestBody:
 *       description: Add an ingredient to a meal
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealFeatureDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New feature successfully added to meal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Invalid input
 */
mealRoutes
  .route('/:mealId/features')
  .get(queryHandler, mealController.getMealFeatures)
  .post(validate(mealFeatureSchema), mealController.addMealFeature)

/**
 * @openapi
 *  /api/v1/meals/{mealId}/features/{featureId}:
 *   get:
 *     tags:
 *       - Meal features
 *     summary: Find meal feature by Id
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/featureId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FeatureDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: meal not found
 *   put:
 *     tags:
 *       - Meal features
 *     summary: Updates the value of an existent feature in meal
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/featureId"
 *     requestBody:
 *       description: Update a meal feature
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealFeatureDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - Feature in meal successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Meal features
 *     summary: Deletes an existing meal feature
 *     parameters:
 *      - $ref: "#/components/parameters/mealId"
 *      - $ref: "#/components/parameters/featureId"
 *     responses:
 *       200:
 *         description: OK - Meal feature successfully deleted
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
  .route('/:mealId/features/:featureId')
  .get(mealController.getMealFeatureById)
  .put(validate(mealFeatureSchema), mealController.addMealFeature)
  .delete(mealController.deleteMealFeature)
export default mealRoutes
