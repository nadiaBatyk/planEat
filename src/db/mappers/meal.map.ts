import { MealDTO } from '../DTOs/meal.dto'
import { Meal } from '../models/Meal'
import { MealTypeMap } from './mealType.map'

export class MealMap {
  public static toDTO(meal: Meal): MealDTO {
    return {
      id: meal.id,
      name: meal.name,
      mealType: MealTypeMap.toDTO(meal.mealType), // tambien tengo q mapearlo
      ingredients: meal.ingredients, // tambien tengo q mapearlo
    }
  }
}
