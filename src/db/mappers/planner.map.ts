import { PlannerDTOResponse } from '../DTOs/planner.dto'
import { Planner } from '../models/Planner'
import { MealMap } from './meal.map'
export class PlannerMap {
  public static toDTO(planner: Planner): PlannerDTOResponse {
    return {
      id: planner.id,
      name: planner.name,
      startDate: planner.startDate,
      finishDate: planner.finishDate,
      active: planner.active,
      meals: planner?.meals && planner?.meals.map(i => MealMap.toDTO(i)),
    }
  }
}
