import { PlannerDao } from '../db/DAOs/classes/planner.dao'
import { MealDTOResponse } from '../db/DTOs/meal.dto'
import { PlannerDTORequest, PlannerDTOResponse } from '../db/DTOs/planner.dto'
import {
  PlannerEntryDTORequest,
  PlannerEntryDTOResponse,
} from '../db/DTOs/plannerEntry.dto'
import { MealMap } from '../db/mappers/meal.map'
import { PlannerMap } from '../db/mappers/planner.map'

export class PlannerService {
  plannerDao: PlannerDao
  constructor() {
    this.plannerDao = new PlannerDao()
  }
  getPlanners = async (): Promise<PlannerDTOResponse[]> => {
    const planners = await this.plannerDao.getPlanners()
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
  getPlannerMeals = async (id: number): Promise<MealDTOResponse[]> => {
    const planner = await this.plannerDao.getPlannerById(id)
    return planner.plannerEntries.map(i => MealMap.toDTO(i.meal))
  }
  getPlannerEntries = async (
    id: number
  ): Promise<PlannerEntryDTOResponse[]> => {
    const planner = await this.plannerDao.getPlannerById(id)

    return PlannerMap.toDTO(planner).plannerEntries as PlannerEntryDTOResponse[]
  }
  addEntrytoPlanner = async (
    plannerId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerDTOResponse> => {
    const planner = await this.plannerDao.addEntryToPlanner(
      plannerId,
      plannerEntryReq
    )
    return PlannerMap.toDTO(planner)
  }
}
