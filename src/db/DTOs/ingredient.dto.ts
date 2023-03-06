import { MeasureUnit } from '../../common/types/measureUnit.types'
import { MealIngredientDTO } from './mealIngredient.dto'
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
 *         MealIngredient:
 *           $ref: "#/components/schemas/MealIngredient"
 *
 */
export interface IngredientDTOResponse {
  id?: number
  name: string
  unit: MeasureUnit
  mealIngredient?: MealIngredientDTO
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
