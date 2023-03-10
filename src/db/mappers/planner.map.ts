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
      meals:
        planner?.plannerMeals &&
        planner?.plannerMeals.map(i => {
          return {
            ...i,
            ...MealMap.toDTO(i.meal),
            ...MealTypeMap.toDTO(i.mealType),
          }
        }),
    }
  }
}
