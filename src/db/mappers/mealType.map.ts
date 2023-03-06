import { MealTypeDTOResponse } from '../DTOs/mealType.dto'
import { MealType } from '../models/MealType'

export class MealTypeMap {
  public static toDTO(mealType: MealType): MealTypeDTOResponse {
    return {
      id: mealType.id,
      name: mealType.name,
    }
  }
}
