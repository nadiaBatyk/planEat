import { Router } from 'express'
import { IngredientController } from '../controllers/ingredient.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import {
  ingredientSchema,
  partialIngredientSchema,
} from '../middlewares/validation/schemas/ingredient.schema'
import { queryParamsHandler } from '../middlewares/filtering/query.middleware'

const ingredientRoutes = Router()
const ingredientController = new IngredientController()

/**
 * @openapi
 *  /api/v1/ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Find all ingredients
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
 *                 $ref: "#/components/schemas/IngredientDTOResponse"
 *   post:
 *     tags:
 *       - Ingredients
 *     summary: Add a new ingredient
 *     requestBody:
 *       description: Create a new ingredient
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IngredientDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New ingredient successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IngredientDTOResponse"
 *       400:
 *         description: Invalid input
 */
ingredientRoutes
  .route('/')
  .get(queryParamsHandler('ingredient'), ingredientController.getIngredients)
  .post(validate(ingredientSchema), ingredientController.createIngredient)

/**
 * @openapi
 *  /api/v1/ingredients/{ingredientId}:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Find ingredient by Id
 *     parameters:
 *      - $ref: "#/components/parameters/ingredientId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IngredientDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: ingredient not found
 *   put:
 *     tags:
 *       - Ingredients
 *     summary: Updates an existing ingredient
 *     parameters:
 *      - $ref: "#/components/parameters/ingredientId"
 *     requestBody:
 *       description: Update a ingredient
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IngredientDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New ingredient successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IngredientDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Ingredients
 *     summary: Deletes an existing ingredient
 *     parameters:
 *      - $ref: "#/components/parameters/ingredientId"
 *     responses:
 *       200:
 *         description: OK - New ingredient successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: ingredient not found
 */
ingredientRoutes
  .route('/:ingredientId')
  .get(ingredientController.getIngredientById)
  .put(validate(partialIngredientSchema), ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient)

export default ingredientRoutes
