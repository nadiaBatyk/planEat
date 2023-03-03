import { MealFeatureDTO } from './mealFeature.dto'

export interface FeatureDTO {
  id?: number
  name: string
  mealFeature?: MealFeatureDTO
}
