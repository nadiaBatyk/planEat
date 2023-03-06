import { MealFeatureDTO } from './mealFeature.dto'
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
export interface FeatureDTOResponse {
  id?: number
  name: string
  mealFeature?: MealFeatureDTO
}
export type FeatureDTORequest = Pick<FeatureDTOResponse, 'name'>
