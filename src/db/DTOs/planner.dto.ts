import { PlannerEntryDTOResponse } from './plannerEntry.dto'

/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         startDate:
 *           type: integer
 *           format: date-time
 *         finishDate:
 *           type: integer
 *           format: date-time
 *         active:
 *           type: boolean
 *         plannerEntries:
 *           type: array
 *           items:
 *              $ref: "#/components/schemas/PlannerEntryDTOResponse"
 */
export interface PlannerDTOResponse {
  id?: number
  name: string
  startDate: Date
  finishDate: Date
  active: boolean
  plannerEntries?: PlannerEntryDTOResponse[]
}
/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerDTORequest:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - finishDate
 *         - active
 *       properties:
 *         name:
 *           type: string
 *           example: Meal prep for the week
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2023-01-01
 *         finishDate:
 *           type: string
 *           format: date
 *           example: 2023-01-10
 *         active:
 *           type: boolean
 */
export type PlannerDTORequest = Omit<
  PlannerDTOResponse,
  'plannerEntries' | 'id'
>

/**
 * @openapi
 * components:
 *   parameters:
 *     plannerId:
 *         name: plannerId
 *         in: path
 *         description: ID of planner to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
