/**
 * @openapi
 * components:
 *   schemas:
 *     MealFeatureDTOResponse:
 *       type: object
 *       properties:
 *         mealId:
 *           type: integer
 *           format: int64
 *         featureId:
 *           type: integer
 *           format: int64
 *         value:
 *           type: string
 *           example: link to meal recipe
 */
export interface MealFeatureDTOResponse {
  mealId: number
  featureId: number
  value: string
}
/**
 * @openapi
 * components:
 *   schemas:
 *     MealFeatureDTORequest:
 *       type: object
 *       required:
 *         - featureId
 *         - value
 *       properties:
 *         featureId:
 *           type: integer
 *           format: int64
 *         value:
 *           type: string
 *           example: link to meal recipe
 */
export type MealFeatureDTORequest = Pick<
  MealFeatureDTOResponse,
  'value' | 'featureId'
>
