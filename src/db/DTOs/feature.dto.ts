import { MealFeatureDTOResponse } from './mealFeature.dto'
/**
 * @openapi
 * components:
 *   schemas:
 *     FeatureDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *           example: Instructions
 *         MealFeature:
 *           $ref: "#/components/schemas/MealFeature"
 */
export interface FeatureDTOResponse {
  id?: number
  name: string
  mealFeature?: MealFeatureDTOResponse
}
/**
 * @openapi
 * components:
 *   schemas:
 *     FeatureDTORequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Instructions
 *
 */
export type FeatureDTORequest = Pick<FeatureDTOResponse, 'name'>

/**
 * @openapi
 * components:
 *   parameters:
 *     featureId:
 *         name: id
 *         in: path
 *         description: ID of feature to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
