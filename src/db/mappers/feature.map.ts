import { FeatureDTOResponse } from '../DTOs/feature.dto'
import { Feature } from '../models/Feature'

export class FeatureMap {
  public static toDTO(feature: Feature): FeatureDTOResponse {
    return {
      id: feature.id,
      name: feature.name,
    }
  }
}
