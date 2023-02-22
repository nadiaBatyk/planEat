import { MealDTO } from '../DTOs/meal.dto'
import { Meal } from '../models/Meal'

export class MealMap {
  public static toDTO(meal: Meal): MealDTO {
    return {
      name: meal.name,
      mealTypeId: meal.mealTypeId,
      mealType:meal.mealType, // tambien tengo q mapearlo
      ingredients:meal.ingredients// tambien tengo q mapearlo
    }
  }
}
