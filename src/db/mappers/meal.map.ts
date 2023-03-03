import { MealDTO } from '../DTOs/meal.dto'
import { Meal } from '../models/Meal'
import { FeatureMap } from './feature.map'
import { IngredientMap } from './ingredient.map'
import { MealTypeMap } from './mealType.map'
export class MealMap {
  public static toDTO(meal: Meal): MealDTO {
    return {
      id: meal?.id,
      name: meal.name,
      mealType: meal?.mealType && MealTypeMap.toDTO(meal.mealType),
      ingredients:
        meal?.ingredients && meal.ingredients.map(i => IngredientMap.toDTO(i)),
      features: meal?.features && meal.features.map(i => FeatureMap.toDTO(i)),
    }
  }
}
