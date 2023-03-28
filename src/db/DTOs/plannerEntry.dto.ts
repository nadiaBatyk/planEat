import { MealDTOResponse } from './meal.dto'
import { MealTimeDTOResponse } from './mealTime.dto'
import { PlannerDTOResponse } from './planner.dto'

/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerEntryDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         plannerId:
 *           type: integer
 *         mealId:
 *           type: integer
 *         MealTimeId:
 *           type: integer
 *         mealDate:
 *           type: string
 *           format: date
 *           example: 2023-01-10
 *         planner:
 *           $ref: "#/components/schemas/PlannerDTOResponse"
 *         meal:
 *           $ref: "#/components/schemas/MealDTOResponse"
 *         MealTime:
 *           $ref: "#/components/schemas/MealTimeDTOResponse"
 */
export interface PlannerEntryDTOResponse {
  id: number
  plannerId: number
  mealId?: number
  mealTimeId?: number
  mealDate: Date
  planner?: PlannerDTOResponse
  meal?: MealDTOResponse
  mealTime?: MealTimeDTOResponse
}
/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerEntryDTORequest:
 *       type: object
 *       required:
 *         - plannerId
 *         - mealId
 *         - MealTimeId
 *         - mealDate
 *       properties:
 *         plannerId:
 *           type: integer
 *         mealId:
 *           type: integer
 *         MealTimeId:
 *           type: integer
 *         mealDate:
 *           type: string
 *           format: date
 *           example: 2023-01-10
 */
export type PlannerEntryDTORequest = Pick<
  PlannerEntryDTOResponse,
  'plannerId' | 'mealId' | 'mealTimeId' | 'mealDate'
>

/**
 * @openapi
 * components:
 *   parameters:
 *     entryId:
 *         name: entryId
 *         in: path
 *         description: ID of entry to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
