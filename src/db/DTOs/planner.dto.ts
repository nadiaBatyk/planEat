import { PlannerMealDTOResponse } from './plannerMeal.dto'

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
 *           example: Meal prep for the week
 *         startDate:
 *           type: integer
 *           format: date
 *         finishDate:
 *           type: integer
 *           format: date
 *         active:
 *           type: boolean
 *         meals:
 *           type: array
 *           items:
 *              $ref: "#/components/schemas/MealDTOResponse"
 */
export interface PlannerDTOResponse {
  id?: number
  name: string
  startDate: Date
  finishDate: Date
  active: boolean
  meals?: PlannerMealDTOResponse[]
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
 *           type: integer
 *           format: date
 *         finishDate:
 *           type: integer
 *           format: date
 *         active:
 *           type: boolean
 */
export type PlannerDTORequest = Omit<PlannerDTOResponse, 'meals' | 'id'>

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
