import { MealDTOResponse } from './meal.dto'
import { MealTypeDTOResponse } from './mealType.dto'
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
 *         mealTypeId:
 *           type: integer
 *         mealDate:
 *           type: string
 *           format: date
 *           example: 2023-01-10
 *         planner:
 *           $ref: "#/components/schemas/PlannerDTOResponse"
 *         meal:
 *           $ref: "#/components/schemas/MealDTOResponse"
 *         mealType:
 *           $ref: "#/components/schemas/MealTypeDTOResponse"
 */
export interface PlannerEntryDTOResponse {
  id: number
  plannerId: number
  mealId: number
  mealTypeId: number
  mealDate: Date
  planner?: PlannerDTOResponse
  meal?: MealDTOResponse
  mealType?: MealTypeDTOResponse
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
 *         - mealTypeId
 *         - mealDate
 *       properties:
 *         plannerId:
 *           type: integer
 *         mealId:
 *           type: integer
 *         mealTypeId:
 *           type: integer
 *         mealDate:
 *           type: string
 *           format: date
 *           example: 2023-01-10
 */
export type PlannerEntryDTORequest = Pick<
  PlannerEntryDTOResponse,
  'plannerId' | 'mealId' | 'mealTypeId' | 'mealDate'
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
