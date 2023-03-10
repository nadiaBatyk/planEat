import { PlannerDao } from '../db/DAOs/classes/planner.dao'
import { MealDTOResponse } from '../db/DTOs/meal.dto'
import { PlannerDTORequest, PlannerDTOResponse } from '../db/DTOs/planner.dto'
import { PlannerMealDTORequest } from '../db/DTOs/plannerMeal.dto'
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
    return planner.plannerMeals.map(i => MealMap.toDTO(i.meal))
  }
  addMealtoPlanner = async (
    plannerId: number,
    plannerMealReq: PlannerMealDTORequest
  ): Promise<MealDTOResponse> => {
    const planner = await this.plannerDao.addMealToPlanner(
      plannerId,
      plannerMealReq
    )
    return PlannerMap.toDTO(planner)
  }
}
