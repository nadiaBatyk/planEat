import HttpException from '../common/error/HttpException'
import { MealDao } from '../db/DAOs/classes/meal.dao'
import { MealTypeDao } from '../db/DAOs/classes/mealType.dao'
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
  mealDao: MealDao
  mealTypeDao: MealTypeDao
  constructor() {
    this.plannerEntryDao = new PlannerEntryDao()
    this.plannerDao = new PlannerDao()
    this.mealDao = new MealDao()
    this.mealTypeDao = new MealTypeDao()
  }
  /**
   * @throws {HttpException}
   * @param plannerId
   * @param plannerEntryReq
   */
  validateEntryRequest = async (
    plannerId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<void> => {
    const planner = await this.plannerDao.getPlannerById(plannerId)
    await this.mealDao.getMealById(plannerEntryReq.mealId)
    await this.mealTypeDao.getMealTypeById(plannerEntryReq.mealTypeId)
    this.checkPlannerRange(planner, plannerEntryReq)
    this.checkDuplicateEntry(planner, plannerEntryReq)
  }
  checkDuplicateEntry = (
    planner: Planner,
    plannerEntryReq: PlannerEntryDTORequest
  ) => {
    const existentEntry =
      planner.plannerEntries &&
      planner.plannerEntries.find(
        entry =>
          entry.mealId === plannerEntryReq.mealId &&
          entry.mealTypeId === plannerEntryReq.mealTypeId &&
          entry.mealDate === plannerEntryReq.mealDate
      )

    if (existentEntry) {
      throw new HttpException(
        400,
        `Planner already has an entry with mealId #${plannerEntryReq.mealId} and mealTypeId #${plannerEntryReq.mealTypeId} for the date ${plannerEntryReq.mealDate} `,
        'Duplicated entry'
      )
    }
  }
  checkPlannerRange = (
    planner: Planner,
    plannerEntryReq: PlannerEntryDTORequest
  ): void => {
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
    await this.validateEntryRequest(plannerId, plannerEntryReq)
    await this.plannerEntryDao.create(plannerEntryReq)
    const updatedPlanner = await this.plannerDao.getPlannerById(plannerId)
    return PlannerMap.toDTO(updatedPlanner)
  }
  updatePlannerEntry = async (
    plannerId: number,
    entryId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerDTOResponse> => {
    await this.validateEntryRequest(plannerId, plannerEntryReq)
    await this.plannerEntryDao.update(entryId, plannerEntryReq)
    const updatedPlanner = await this.plannerDao.getPlannerById(plannerId)
    return PlannerMap.toDTO(updatedPlanner)
  }
  deletePlannerEntry = async (entryId: number): Promise<string> => {
    const message = await this.plannerEntryDao.delete(entryId)
    return message
  }
}
