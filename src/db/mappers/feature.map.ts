import { FeatureDTO } from '../DTOs/feature.dto'
import { Feature } from '../models/Feature'

export class FeatureMap {
  public static toDTO(feature: Feature): FeatureDTO {
    return {
      id: feature.id,
      name: feature.name,
      mealFeature: feature.dataValues?.MealFeature,
    }
  }
}
