import { Router } from 'express'
import { validate } from '../middlewares/validation/validate.middleware'
import { MealTimeController } from '../controllers/mealTime.controller'
import { mealTimeSchema } from '../middlewares/validation/schemas/mealTime.schema'
import { queryParamsHandler } from '../middlewares/filtering/query.middleware'

const mealTimeRoutes = Router()
const mealTimeController = new MealTimeController()
/**
 * @openapi
 *  /api/v1/mealTimes:
 *   get:
 *     tags:
 *       - MealTimes
 *     summary: Find all available meal times
 *     parameters:
 *      - $ref: "#/components/parameters/pageNumber"
 *      - $ref: "#/components/parameters/pageSize"
 *      - $ref: "#/components/parameters/orderBy"
 *      - $ref: "#/components/parameters/direction"
 *      - $ref: "#/components/parameters/mealTimeFilter"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MealTimeDTOResponse"
 *   post:
 *     tags:
 *       - MealTimes
 *     summary: Add a new meal time
 *     requestBody:
 *       description: Create a new meal time
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealTimeDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New Meal Time successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealTimeDTOResponse"
 *       400:
 *         description: Invalid input
 */
mealTimeRoutes
  .route('/')
  .get(queryParamsHandler('mealTime'), mealTimeController.getMealTimes)
  .post(validate(mealTimeSchema), mealTimeController.createType)

/**
 * @openapi
 *  /api/v1/mealTimes/{mealTimeId}:
 *   get:
 *     tags:
 *       - MealTimes
 *     summary: Find meal Time by Id
 *     parameters:
 *      - $ref: "#/components/parameters/mealTimeId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealTimeDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Meal Time not found
 *   put:
 *     tags:
 *       - MealTimes
 *     summary: Updates an existing meal Time
 *     parameters:
 *      - $ref: "#/components/parameters/mealTimeId"
 *     requestBody:
 *       description: Update a meal Time
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MealTimeDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New Meal Time successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MealTimeDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - MealTimes
 *     summary: Deletes an existing meal Time
 *     parameters:
 *      - $ref: "#/components/parameters/mealTimeId"
 *     responses:
 *       200:
 *         description: OK - New Meal Time successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Meal Time not found
 */
mealTimeRoutes
  .route('/:mealTimeId')
  .get(mealTimeController.getMealTimeById)
  .put(validate(mealTimeSchema), mealTimeController.updateMealTime)
  .delete(mealTimeController.deleteMealTime)

export default mealTimeRoutes
