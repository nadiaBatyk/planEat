import { FeatureDTOResponse } from './feature.dto'
import { IngredientDTOResponse } from './ingredient.dto'
import { MealTypeDTOResponse } from './mealType.dto'

export interface MealDTOResponse {
  id?: number
  name: string
  mealTypeId?: number
  mealType?: MealTypeDTOResponse
  ingredients?: IngredientDTOResponse[]
  features?: FeatureDTOResponse[]
}

export type MealDTORequest = Pick<MealDTOResponse, 'name' | 'mealTypeId'>
