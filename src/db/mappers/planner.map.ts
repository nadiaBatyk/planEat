import { PlannerDTOResponse } from '../DTOs/planner.dto'
import { Planner } from '../models/Planner'
export class PlannerMap {
  public static toDTO(planner: Planner): PlannerDTOResponse {
    return {
      id: planner.id,
      name: planner.name,
      startDate: planner.startDate,
      finishDate: planner.finishDate,
    }
  }
}
