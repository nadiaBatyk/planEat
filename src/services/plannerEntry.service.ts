import HttpException from '../common/error/HttpException'
import { PlannerDao } from '../db/DAOs/classes/planner.dao'
import { PlannerEntryDao } from '../db/DAOs/classes/plannerEntry.dao'
import { PlannerDTOResponse } from '../db/DTOs/planner.dto'
import {
  PlannerEntryDTORequest,
  PlannerEntryDTOResponse,
} from '../db/DTOs/plannerEntry.dto'
import { PlannerMap } from '../db/mappers/planner.map'
import { PlannerEntryMap } from '../db/mappers/plannerEntry.map'
import { Planner } from '../db/models/Planner'

export class PlannerEntryService {
  plannerEntryDao: PlannerEntryDao
  plannerDao: PlannerDao
  constructor() {
    this.plannerEntryDao = new PlannerEntryDao()
    this.plannerDao = new PlannerDao()
  }
  /**
   * @throws {HttpException}
   * @param planner
   * @param plannerEntryReq
   */
  validateEntryRequest = (
    planner: Planner,
    plannerEntryReq: PlannerEntryDTORequest
  ): never | void => {
    const existentEntry =
      planner.plannerEntries &&
      planner.plannerEntries.find(
        entry =>
          entry.mealId === plannerEntryReq.mealId &&
          entry.mealTypeId === plannerEntryReq.mealTypeId &&
          entry.mealDate === plannerEntryReq.mealDate
      )
    if (
      plannerEntryReq.mealDate < planner.startDate ||
      plannerEntryReq.mealDate > planner.finishDate
    ) {
      throw new HttpException(
        400,
        `Planner is active from ${planner.startDate} to ${planner.finishDate}`,
        'Meal date out of planner date range'
      )
    }
    if (existentEntry) {
      throw new HttpException(
        400,
        `Planner already has an entry with mealId #${plannerEntryReq.mealId} and mealTypeId #${plannerEntryReq.mealTypeId} for the date ${plannerEntryReq.mealDate} `,
        'Duplicated entry'
      )
    }
    if (!planner) {
      throw new HttpException(404, `Planner does not exist`, 'Not Found')
    }
  }
  getPlannerEntries = async (
    id: number
  ): Promise<PlannerEntryDTOResponse[]> => {
    const planner = await this.plannerDao.getPlannerById(id)

    return PlannerMap.toDTO(planner).plannerEntries as PlannerEntryDTOResponse[]
  }
  getPlannerEntryById = async (
    entryId: number
  ): Promise<PlannerEntryDTOResponse> => {
    const entry = await this.plannerEntryDao.getPlannerEntryById(entryId)

    return PlannerEntryMap.toDTO(entry)
  }

  addEntrytoPlanner = async (
    plannerId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerDTOResponse> => {
    const planner = await this.plannerDao.getPlannerById(plannerId)
    this.validateEntryRequest(planner, plannerEntryReq)
    await this.plannerEntryDao.create(plannerEntryReq)
    const updatedPlanner = await this.plannerDao.getPlannerById(plannerId)
    return PlannerMap.toDTO(updatedPlanner)
  }
  updatePlannerEntry = async (
    plannerId: number,
    entryId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerDTOResponse> => {
    const planner = await this.plannerDao.getPlannerById(plannerId)
    this.validateEntryRequest(planner, plannerEntryReq)
    await this.plannerEntryDao.update(entryId, plannerEntryReq)
    const updatedPlanner = await this.plannerDao.getPlannerById(plannerId)
    return PlannerMap.toDTO(updatedPlanner)
  }
  deletePlannerEntry = async (entryId: number): Promise<string> => {
    const message = await this.plannerEntryDao.delete(entryId)
    return message
  }
}
