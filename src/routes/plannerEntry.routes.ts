import { Router } from 'express'
import { PlannerEntryController } from '../controllers/plannerEntry.controller'
import { validate } from '../middlewares/validation/validate.middleware'
import { plannerEntrySchema } from '../middlewares/validation/schemas/plannerEntry.schema'

export const plannerEntryRoutes = Router()
const plannerEntryController = new PlannerEntryController()

/**
 * @openapi
 *  /api/v1/plannerEntries:
 *   post:
 *     tags:
 *       - Planner Entries
 *     summary: Add a entry to a planner
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
 *               $ref: "#/components/schemas/PlannerEntryDTOResponse"
 *       400:
 *         description: Invalid input
 */
plannerEntryRoutes
  .route('/')
  .post(validate(plannerEntrySchema), plannerEntryController.addMealToPlanner)

/**
 * @openapi
 *  /api/v1/plannerEntries/{entryId}:
 *   get:
 *     tags:
 *       - Planner Entries
 *     summary: Find entry by Id
 *     parameters:
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
 *               $ref: "#/components/schemas/PlannerEntryDTOResponse"
 *       400:
 *         description: Invalid input
 *   delete:
 *     tags:
 *       - Planner Entries
 *     summary: Deletes an existing entry
 *     parameters:
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
plannerEntryRoutes
  .route('/:entryId')
  .get(plannerEntryController.getPlannerEntryById)
  .put(validate(plannerEntrySchema), plannerEntryController.updatePlannerEntry)
  .delete(plannerEntryController.deletePlannerEntry)
