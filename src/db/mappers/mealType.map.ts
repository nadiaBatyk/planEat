import { MealTypeDTO } from '../DTOs/mealType.dto'
import { MealType } from '../models/MealType'

export class MealTypeMap {
  public static toDTO(mealType: MealType): MealTypeDTO {
    return {
      id: mealType.id,
      name: mealType.name,
    }
  }
}
