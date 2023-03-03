import { MeasureUnit } from '../../common/types/measureUnit.types'
import { MealIngredientDTO } from './mealIngredient.dto'

export interface IngredientDTO {
  id?: number
  name: string
  unit: MeasureUnit
  mealIngredient?: MealIngredientDTO
}
