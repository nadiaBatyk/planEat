import { PlannerEntryDTOResponse } from '../DTOs/plannerEntry.dto'
import { PlannerEntry } from '../models/PlannerEntry'
import { MealMap } from './meal.map'
import { MealTypeMap } from './mealType.map'

export class PlannerEntryMap {
  public static toDTO(plannerEntry: PlannerEntry): PlannerEntryDTOResponse {
    return {
      id: plannerEntry.id,
      plannerId: plannerEntry.plannerId,
      mealId: plannerEntry.mealId,
      mealTypeId: plannerEntry.mealTypeId,
      mealDate: plannerEntry.mealDate,
      meal: MealMap.toDTO(plannerEntry.meal),
      mealType: MealTypeMap.toDTO(plannerEntry.mealType),
    }
  }
}
