import { PlannerEntryDTOResponse } from '../DTOs/plannerEntry.dto'
import { PlannerEntry } from '../models/PlannerEntry'
import { MealMap } from './meal.map'
import { MealTimeMap } from './mealTime.map'

export class PlannerEntryMap {
  public static toDTO(plannerEntry: PlannerEntry): PlannerEntryDTOResponse {
    return {
      id: plannerEntry.id,
      plannerId: plannerEntry.plannerId,
      mealDate: plannerEntry.mealDate,
      mealId: plannerEntry.mealId,
      mealTimeId: plannerEntry.mealTimeId,
      meal: MealMap.toDTO(plannerEntry.meal),
      mealTime: MealTimeMap.toDTO(plannerEntry.mealTime),
    }
  }
}
