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
 *     featureFilter:
 *         name: filter
 *         in: query
 *         schema:
 *           $ref: "#/components/schemas/FeatureDTOResponse"
 *     featureId:
 *         name: featureId
 *         in: path
 *         description: ID of feature to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
