/**
 * @openapi
 * components:
 *   schemas:
 *     MealDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           example: Pasta with tomato sauce
 */
export interface MealDTOResponse {
  id?: number
  name: string
}

/**
 * @openapi
 * components:
 *   schemas:
 *     MealDTORequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Pasta with tomato sauce
 */
export type MealDTORequest = Pick<MealDTOResponse, 'name'>

/**
 * @openapi
 * components:
 *   parameters:
 *     mealId:
 *         name: mealId
 *         in: path
 *         description: ID of meal to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
