import { Router } from 'express'
import { PlannerController } from '../controllers/planner.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { plannerSchema } from '../middlewares/validation/schemas/planner.schema'

export const plannerRoutes = Router()
const plannerController = new PlannerController()

/**
 * @openapi
 *  /api/v1/planners:
 *   get:
 *     tags:
 *       - Planners
 *     summary: Find all planners
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/PlannerDTOResponse"
 *   post:
 *     tags:
 *       - Planners
 *     summary: Add a new planner
 *     requestBody:
 *       description: Create a new planner
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PlannerDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New planner successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlannerDTOResponse"
 *       400:
 *         description: Invalid input
 */
plannerRoutes
  .route('/')
  .get(plannerController.getPlanners)
  .post(validate(plannerSchema), plannerController.createPlanner)

/**
 * @openapi
 *  /api/v1/planners/{plannerId}:
 *   get:
 *     tags:
 *       - Planners
 *     summary: Find planner by Id
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlannerDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: planner not found
 *   put:
 *     tags:
 *       - Planners
 *     summary: Updates an existing planner
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *     requestBody:
 *       description: Update a planner
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PlannerDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - planner successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlannerDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Planners
 *     summary: Deletes an existing planner
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *     responses:
 *       200:
 *         description: OK - planner successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: planner not found
 */
plannerRoutes
  .route('/:plannerId')
  .get(plannerController.getPlannerById)
  .put(validate(plannerSchema), plannerController.updatePlanner)
  .delete(plannerController.deletePlanner)

/**
 * @openapi
 *  /api/v1/planners/{plannerId}/meals:
 *   get:
 *     tags:
 *       - Planners
 *     summary: Find all meals in one planner
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MealDTOResponse"
 */
plannerRoutes.route('/:plannerId/meals').get(plannerController.getPlannerMeals)
