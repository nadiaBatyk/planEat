import { IngredientDTO } from './ingredient.dto'
import { MealTypeDTO } from './mealType.dto'

export interface MealDTO {
  id?: number
  name: string
  mealTypeId?: number
  mealType?: MealTypeDTO
  ingredients?: IngredientDTO[]
}
