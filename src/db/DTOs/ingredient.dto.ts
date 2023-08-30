import { MeasureUnit } from '../../common/types/measureUnit.types'
import { MealIngredientDTOResponse } from './mealIngredient.dto'

/**
 * @openapi
 * components:
 *   schemas:
 *     IngredientDTOResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *           example: Rice
 *         unit:
 *           type: string
 *           enum:
 *             - unidades
 *             - cucharas de sopa
 *             - gramos
 *             - kilos
 *             - cm3
 *             - mililitros
 *             - litros
 *             - cucharas de te
 *             - tazas
 *             - rodajas
 *             - piezas
 *             - hojas
 *
 */
export interface IngredientDTOResponse {
  id?: number
  name: string
  unit: MeasureUnit
  mealIngredient?: MealIngredientDTOResponse
}
/**
 * @openapi
 * components:
 *   schemas:
 *     IngredientDTORequest:
 *       type: object
 *       required:
 *         - name
 *         - unit
 *       properties:
 *         name:
 *           type: string
 *           example: Rice
 *         unit:
 *           type: string
 *           enum:
 *             - unidades
 *             - cucharas de sopa
 *             - gramos
 *             - kilos
 *             - cm3
 *             - mililitros
 *             - litros
 *             - cucharas de te
 *             - tazas
 *             - rodajas
 *             - piezas
 *             - hojas
 */
export type IngredientDTORequest = Pick<IngredientDTOResponse, 'name' | 'unit'>

/**
 * @openapi
 * components:
 *   parameters:
 *     ingredientFilter:
 *         name: filter
 *         in: query
 *         schema:
 *           $ref: "#/components/schemas/IngredientDTOResponse"
 *     ingredientId:
 *         name: ingredientId
 *         in: path
 *         description: ID of ingredient to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 */
