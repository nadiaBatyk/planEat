import { Query } from '../common/types/query.types'
import { PlannerDao } from '../db/DAOs/classes/planner.dao'
import { PlannerEntryDao } from '../db/DAOs/classes/plannerEntry.dao'
import { MealDTOResponse } from '../db/DTOs/meal.dto'
import { PlannerDTORequest, PlannerDTOResponse } from '../db/DTOs/planner.dto'

import { MealMap } from '../db/mappers/meal.map'
import { PlannerMap } from '../db/mappers/planner.map'
import { Meal } from '../db/models/Meal'
import { PlannerEntry } from '../db/models/PlannerEntry'

export class PlannerService {
  plannerDao: PlannerDao
  plannerEntriesDao: PlannerEntryDao
  constructor() {
    this.plannerDao = new PlannerDao()
    this.plannerEntriesDao = new PlannerEntryDao()
  }
  getPlanners = async (query: Query): Promise<PlannerDTOResponse[]> => {
    const planners = await this.plannerDao.getPlanners(query)
    return planners.map(m => PlannerMap.toDTO(m))
  }
  getPlannerById = async (id: number): Promise<PlannerDTOResponse> => {
    const planner = await this.plannerDao.getPlannerById(id)
    return PlannerMap.toDTO(planner)
  }
  createPlanner = async (
    planner: PlannerDTORequest
  ): Promise<PlannerDTOResponse> => {
    const newPlanner = await this.plannerDao.create(planner)
    return PlannerMap.toDTO(newPlanner)
  }
  updatePlanner = async (
    id: number,
    planner: PlannerDTORequest
  ): Promise<PlannerDTOResponse> => {
    const updatedPlanner = await this.plannerDao.update(id, planner)
    return PlannerMap.toDTO(updatedPlanner)
  }
  deletePlanner = async (id: number): Promise<string> => {
    const message = await this.plannerDao.delete(id)
    return message
  }
  //ver si esto despues cambia con el filtrado
  getPlannerMeals = async (
    id: number,
    query: Query
  ): Promise<MealDTOResponse[]> => {
    await this.plannerDao.getPlannerById(id)
    const plannerEntries = await PlannerEntry.findAll({
      where: { plannerId: id },
      order: [[query.orderBy, query.direction]],
      limit: query.pageSize,
      offset: (query.pageNumber - 1) * query.pageSize,
      include: [Meal],
    })
    return plannerEntries.map(i => MealMap.toDTO(i.meal))
  }
}
