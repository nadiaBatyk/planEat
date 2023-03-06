import { MeasureUnit } from '../../common/types/measureUnit.types'
import { MealIngredientDTO } from './mealIngredient.dto'

export interface IngredientDTOResponse {
  id?: number
  name: string
  unit: MeasureUnit
  mealIngredient?: MealIngredientDTO
}

export type IngredientDTORequest = Pick<IngredientDTOResponse, 'name' | 'unit'>
