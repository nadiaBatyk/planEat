import { MealFeatureDTO } from './mealFeature.dto'

export interface FeatureDTOResponse {
  id?: number
  name: string
  mealFeature?: MealFeatureDTO
}
export type FeatureDTORequest = Pick<FeatureDTOResponse, 'name'>
