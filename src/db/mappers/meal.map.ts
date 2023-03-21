import { MealDTOResponse } from '../DTOs/meal.dto'
import { Meal } from '../models/Meal'
import { FeatureMap } from './feature.map'
import { IngredientMap } from './ingredient.map'
export class MealMap {
  public static toDTO(meal: Meal): MealDTOResponse {
    return {
      id: meal?.id,
      name: meal.name,
      ingredients:
        meal?.ingredients && meal.ingredients.map(i => IngredientMap.toDTO(i)),
      features: meal?.features && meal.features.map(i => FeatureMap.toDTO(i)),
    }
  }
}
