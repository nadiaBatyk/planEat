import { MealTimeDTOResponse } from '../DTOs/mealTime.dto'
import { MealTime } from '../models/MealTime'

export class MealTimeMap {
  public static toDTO(MealTime: MealTime): MealTimeDTOResponse {
    return {
      id: MealTime.id,
      name: MealTime.name,
    }
  }
}
