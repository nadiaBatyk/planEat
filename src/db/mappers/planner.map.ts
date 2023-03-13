import { PlannerDTOResponse } from '../DTOs/planner.dto'
import { Planner } from '../models/Planner'
import { PlannerEntryMap } from './plannerEntry.map'
export class PlannerMap {
  public static toDTO(planner: Planner): PlannerDTOResponse {
    return {
      id: planner.id,
      name: planner.name,
      startDate: new Date(planner.startDate.toLocaleDateString()),
      finishDate: new Date(planner.finishDate.toLocaleDateString()),
      active: planner.active,
      plannerEntries:
        planner?.plannerEntries &&
        planner?.plannerEntries.map(i => PlannerEntryMap.toDTO(i)),
    }
  }
}
