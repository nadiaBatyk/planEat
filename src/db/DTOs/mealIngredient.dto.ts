/**
 * @openapi
 * components:
 *   schemas:
 *     MealIngredientDTOResponse:
 *       type: object
 *       properties:
 *         mealId:
 *           type: integer
 *           format: int64
 *         ingredientId:
 *           type: integer
 *           format: int64
 *         quantity:
 *           type: number
 *           format: float
 */
export interface MealIngredientDTOResponse {
  mealId: number
  ingredientId: number
  quantity: number
}
/**
 * @openapi
 * components:
 *   schemas:
 *     MealIngredientDTORequest:
 *       type: object
 *       required:
 *         - quantity
 *         - ingredientId
 *       properties:
 *         ingredientId:
 *           type: integer
 *           format: int64
 *         quantity:
 *           type: number
 *           format: float
 */
export type MealIngredientDTORequest = Pick<
  MealIngredientDTOResponse,
  'quantity' | 'ingredientId'
>
/**
 * @openapi
 * components:
 *   parameters:
 *     mealIngredientFilter:
 *         name: filter
 *         in: query
 *         schema:
 *           $ref: "#/components/schemas/IngredientDTOResponse"
 *   schemas:
 *     UpdateMealIngredientDTORequest:
 *       type: object
 *       required:
 *         - quantity
 *       properties:
 *         quantity:
 *           type: number
 *           format: float
 */
