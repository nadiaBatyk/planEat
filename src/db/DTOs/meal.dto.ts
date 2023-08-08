import { FeatureDTOResponse } from './feature.dto'
import { IngredientDTOResponse } from './ingredient.dto'
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
 *         ingredients:
 *           type: array
 *           items:
 *              $ref: "#/components/schemas/IngredientDTOResponse"
 *         features:
 *           type: array
 *           items:
 *              $ref: "#/components/schemas/FeatureDTOResponse"
 */
export interface MealDTOResponse {
  id?: number
  name: string
  ingredients?: IngredientDTOResponse[]
  features?: FeatureDTOResponse[]
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
