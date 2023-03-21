import { Router } from 'express'
import { PlannerController } from '../controllers/planner.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { PlannerSchema } from '../middlewares/validation/schemas/planner.schema'
import { PlannerEntrySchema } from '../middlewares/validation/schemas/plannerEntry.schema'

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
  .post(validate(PlannerSchema), plannerController.createPlanner)

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
  .put(validate(PlannerSchema), plannerController.updatePlanner)
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

/**
 * @openapi
 *  /api/v1/planners/{plannerId}/entries:
 *   get:
 *     tags:
 *       - Planner Entries
 *     summary: Find all entries in one planner
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
 *                 $ref: "#/components/schemas/PlannerEntryDTOResponse"
 *   post:
 *     tags:
 *       - Planner Entries
 *     summary: Add a entry to a planner
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *     requestBody:
 *       description: Add a meal to a planner
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PlannerEntryDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - New meal successfully added to planner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlannerDTOResponse"
 *       400:
 *         description: Invalid input
 */
plannerRoutes
  .route('/:plannerId/entries')
  .get(plannerController.getPlannerEntries)
  .post(validate(PlannerEntrySchema), plannerController.addMealToPlanner)

/**
 * @openapi
 *  /api/v1/planners/{plannerId}/entries/{entryId}:
 *   get:
 *     tags:
 *       - Planner Entries
 *     summary: Find entry by Id
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *      - $ref: "#/components/parameters/entryId"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlannerEntryDTOResponse"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: entry not found
 *   put:
 *     tags:
 *       - Planner Entries
 *     summary: Updates the value of an planner entry
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *      - $ref: "#/components/parameters/entryId"
 *     requestBody:
 *       description: Update a planner entry
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PlannerEntryDTORequest"
 *       required: true
 *     responses:
 *       200:
 *         description: OK - Entry in planner successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlannerDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Planner Entries
 *     summary: Deletes an existing entry
 *     parameters:
 *      - $ref: "#/components/parameters/plannerId"
 *      - $ref: "#/components/parameters/entryId"
 *     responses:
 *       200:
 *         description: OK - Entry successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Entry not found
 */
plannerRoutes
  .route('/:plannerId/entries/:entryId')
  .get(plannerController.getPlannerEntryById)
  .put(validate(PlannerEntrySchema), plannerController.updatePlannerEntry)
  .delete(plannerController.deletePlannerEntry)
