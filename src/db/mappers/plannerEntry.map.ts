import { PlannerEntryDTOResponse } from '../DTOs/plannerEntry.dto'
import { PlannerEntry } from '../models/PlannerEntry'
import { MealMap } from './meal.map'
import { MealTimeMap } from './mealTime.map'

export class PlannerEntryMap {
  public static toDTO(plannerEntry: PlannerEntry): PlannerEntryDTOResponse {
    return {
      id: plannerEntry.id,
      plannerId: plannerEntry.plannerId,
      mealId: plannerEntry.mealId,
      MealTimeId: plannerEntry.MealTimeId,
      mealDate: plannerEntry.mealDate,
      meal: MealMap.toDTO(plannerEntry.meal),
      MealTime: MealTimeMap.toDTO(plannerEntry.MealTime),
    }
  }
}
