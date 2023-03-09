/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerMealDTOResponse:
 *       type: object
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
export interface PlannerMealDTOResponse {
  plannerId: number
  mealId: number
  mealTypeId: number
  mealDate: Date
}
/**
 * @openapi
 * components:
 *   schemas:
 *     PlannerMealDTORequest:
 *       type: object
 *       required:
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
export type PlannerMealDTORequest = Omit<PlannerMealDTOResponse, 'plannerId'>
