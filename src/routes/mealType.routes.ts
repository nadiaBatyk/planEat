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
 *               $ref: "#/components/schemas/MealType"
 *   post:
 *     tags:
 *       - MealTypes
 *     summary: Add a new meal type
 *     requestBody:
 *       description: Create a new meal type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealType"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New Meal Type successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealType"
 *       400:
 *         description: Invalid input
 */
mealTypeRoutes
  .route('/')
  .get(mealTypeController.getMealTypes)
  .post(validate(MealTypeSchema), mealTypeController.createType)

/**
 * @openapi
 *  /api/v1/mealTypes/{id}:
 *   get:
 *     tags:
 *       - MealTypes
 *     summary: Find meal type by Id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of meal Type to return
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
 *               $ref: "#/components/schemas/MealType"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Meal Type not found
 *   put:
 *     tags:
 *       - MealTypes
 *     summary: Updates an existing meal type
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of meal Type to update
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *     requestBody:
 *       description: Update a meal type
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealType"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New Meal Type successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealType"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - MealTypes
 *     summary: Deletes an existing meal type
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of meal Type to delete
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *     responses:
 *       200:
 *         description: OK - New Meal Type successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealType"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Meal Type not found
 */
mealTypeRoutes
  .route('/:id')
  .get(mealTypeController.getMealTypeById)
  .put(validate(MealTypeSchema), mealTypeController.updateMealType)
  .delete(mealTypeController.deleteMealType)

mealTypeRoutes.route('/:id/meals').get(mealTypeController.getMealsInType)

export default mealTypeRoutes
