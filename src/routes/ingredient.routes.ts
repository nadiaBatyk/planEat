import { Router } from 'express'
import { IngredientController } from '../controllers/ingredient.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import {
  IngredientSchema,
  PartialIngredientSchema,
} from '../middlewares/validation/schemas/ingredient.schema'

const ingredientRoutes = Router()
const ingredientController = new IngredientController()

/**
 * @openapi
 *  /api/v1/ingredients:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Find all ingredients
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
  .get(ingredientController.getIngredients)
  .post(validate(IngredientSchema), ingredientController.createIngredient)

/**
 * @openapi
 *  /api/v1/ingredients/{id}:
 *   get:
 *     tags:
 *       - Ingredients
 *     summary: Find ingredient by Id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of ingredient to return
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
 *      - name: id
 *        in: path
 *        description: ID of ingredient to update
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
 *      - name: id
 *        in: path
 *        description: ID of ingredient to delete
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
  .route('/:id')
  .get(ingredientController.getIngredientById)
  .put(validate(PartialIngredientSchema), ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient)

export default ingredientRoutes
