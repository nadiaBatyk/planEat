import { PlannerDTOResponse } from '../DTOs/planner.dto'
import { Planner } from '../models/Planner'
import { MealMap } from './meal.map'
import { MealTypeMap } from './mealType.map'
export class PlannerMap {
  public static toDTO(planner: Planner): PlannerDTOResponse {
    return {
      id: planner.id,
      name: planner.name,
      startDate: planner.startDate,
      finishDate: planner.finishDate,
      active: planner.active,
      plannerEntries:
        planner?.plannerEntries &&
        planner?.plannerEntries.map(i => {
          return {
            mealDate: i.mealDate,
            meal: MealMap.toDTO(i.meal),
            mealType: MealTypeMap.toDTO(i.mealType),
          }
        }),
    }
  }
}
