import { Router } from 'express'
import { MealTypeController } from '../controllers/mealType.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { MealTypeSchema } from '../middlewares/validation/schemas/mealType.schema'

const mealTypeRoutes = Router()
const mealTypeController = new MealTypeController()
/**
 * @openapi
 *  /api/v1/mealTypes:
 *   get:
 *     tags:
 *       - MealTypes
 *     summary: Find all available meal types
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MealTypeDTOResponse"
 *   post:
 *     tags:
 *       - MealTypes
 *     summary: Add a new meal type
 *     requestBody:
 *       description: Create a new meal type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealTypeDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New Meal Type successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealTypeDTOResponse"
 *       400:
 *         description: Invalid input
 */
mealTypeRoutes
  .route('/')
  .get(mealTypeController.getMealTypes)
  .post(validate(MealTypeSchema), mealTypeController.createType)

/**
 * @openapi
 *  /api/v1/mealTypes/{mealTypeId}:
 *   get:
 *     tags:
 *       - MealTypes
 *     summary: Find meal type by Id
 *     parameters:
 *      - $ref: "#/components/parameters/mealTypeId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealTypeDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Meal Type not found
 *   put:
 *     tags:
 *       - MealTypes
 *     summary: Updates an existing meal type
 *     parameters:
 *      - $ref: "#/components/parameters/mealTypeId"
 *     requestBody:
 *       description: Update a meal type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealTypeDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New Meal Type successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealTypeDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - MealTypes
 *     summary: Deletes an existing meal type
 *     parameters:
 *      - $ref: "#/components/parameters/mealTypeId"
 *     responses:
 *       200:
 *         description: OK - New Meal Type successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Meal Type not found
 */
mealTypeRoutes
  .route('/:mealTypeId')
  .get(mealTypeController.getMealTypeById)
  .put(validate(MealTypeSchema), mealTypeController.updateMealType)
  .delete(mealTypeController.deleteMealType)

/**
 * @openapi
 *  /api/v1/mealTypes/{mealTypeId}/meals:
 *   get:
 *     tags:
 *       - MealTypes
 *     summary: Find meals by type
 *     parameters:
 *      - $ref: "#/components/parameters/mealTypeId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/MealTypeDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Meal Type not found
 */
mealTypeRoutes
  .route('/:mealTypeId/meals')
  .get(mealTypeController.getMealsInType)

export default mealTypeRoutes
