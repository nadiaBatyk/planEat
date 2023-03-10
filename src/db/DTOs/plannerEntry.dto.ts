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
 *           type: integer
 *           format: date
 *         planner:
 *           $ref: "#/components/schemas/PlannerDTOResponse"
 *         meal:
 *           $ref: "#/components/schemas/MealDTOResponse"
 *         mealType:
 *           $ref: "#/components/schemas/MealTypeDTOResponse"
 */
export interface PlannerEntryDTOResponse {
  id: number
  plannerId?: number
  mealId?: number
  mealTypeId?: number
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
 *           type: integer
 *           format: date
 */
export type PlannerEntryDTORequest = Pick<
  PlannerEntryDTOResponse,
  'mealId' | 'mealTypeId' | 'mealDate' | 'plannerId'
>
