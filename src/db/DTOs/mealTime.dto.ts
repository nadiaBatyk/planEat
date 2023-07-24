/**
 * @openapi
 * components:
 *   schemas:
 *     MealTimeDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *           example: Breakfast
 *
 */
export interface MealTimeDTOResponse {
  id?: number
  name: string
}
/**
 * @openapi
 * components:
 *   schemas:
 *     MealTimeDTORequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Breakfast
 *
 */
export type MealTimeDTORequest = Pick<MealTimeDTOResponse, 'name'>
/**
 * @openapi
 * components:
 *   parameters:
 *     mealTimeId:
 *         name: mealTimeId
 *         in: path
 *         description: ID of feature to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
