import { FeatureDTOResponse } from './feature.dto'
import { IngredientDTOResponse } from './ingredient.dto'
import { MealTypeDTOResponse } from './mealType.dto'
import { PlannerMealDTOResponse } from './plannerMeal.dto'
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
 *           example: Fideos con tuco
 *         mealTypeId:
 *           type: integer
 *         mealType:
 *           $ref: "#/components/schemas/MealTypeDTOResponse"
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
  mealTypeId?: number
  mealType?: MealTypeDTOResponse
  ingredients?: IngredientDTOResponse[]
  features?: FeatureDTOResponse[]
  plannerMeal?: PlannerMealDTOResponse
}
/**
 * @openapi
 * components:
 *   schemas:
 *     MealDTORequest:
 *       type: object
 *       required:
 *         - name
 *         - mealTypeId
 *       properties:
 *         name:
 *           type: string
 *           example: Fideos con tuco
 *         mealTypeId:
 *           type: integer
 */
export type MealDTORequest = Pick<MealDTOResponse, 'name' | 'mealTypeId'>

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
