import { IngredientDTO } from '../DTOs/ingredient.dto'
import { Ingredient } from '../models/Ingredient'

export class IngredientMap {
  public static toDTO(ingredient: Ingredient): IngredientDTO {
    return {
      id: ingredient.id,
      name: ingredient.name,
      unit: ingredient.unit,
      mealIngredient: ingredient.dataValues?.MealIngredient,
    }
  }
}
