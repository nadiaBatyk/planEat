/**
 * @openapi
 * components:
 *   schemas:
 *     MealTypeDTOResponse:
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
export interface MealTypeDTOResponse {
  id?: number
  name: string
}
/**
 * @openapi
 * components:
 *   schemas:
 *     MealTypeDTORequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Breakfast
 *
 */
export type MealTypeDTORequest = Pick<MealTypeDTOResponse, 'name'>
/**
 * @openapi
 * components:
 *   parameters:
 *     mealTypeId:
 *         name: mealTypeId
 *         in: path
 *         description: ID of feature to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
