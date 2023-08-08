import { MealDTOResponse } from '../DTOs/meal.dto'
import { Meal } from '../models/Meal'
export class MealMap {
  public static toDTO(meal: Meal): MealDTOResponse {
    return {
      id: meal?.id,
      name: meal.name,
    }
  }
}
