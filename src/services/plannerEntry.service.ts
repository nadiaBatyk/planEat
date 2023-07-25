import HttpException from '../common/error/HttpException'
import { Query } from '../common/types/query.types'
import { MealDao } from '../db/DAOs/classes/meal.dao'
import { MealTimeDao } from '../db/DAOs/classes/mealTime.dao'
import { PlannerDao } from '../db/DAOs/classes/planner.dao'
import { PlannerEntryDao } from '../db/DAOs/classes/plannerEntry.dao'
import {
  PlannerEntryDTORequest,
  PlannerEntryDTOResponse,
} from '../db/DTOs/plannerEntry.dto'
import { PlannerEntryMap } from '../db/mappers/plannerEntry.map'
import { Planner } from '../db/models/Planner'
import { PlannerEntry } from '../db/models/PlannerEntry'

export class PlannerEntryService {
  plannerEntryDao: PlannerEntryDao
  plannerDao: PlannerDao
  mealDao: MealDao
  mealTimeDao: MealTimeDao
  constructor() {
    this.plannerEntryDao = new PlannerEntryDao()
    this.plannerDao = new PlannerDao()
    this.mealDao = new MealDao()
    this.mealTimeDao = new MealTimeDao()
  }
  /**
   * @throws {HttpException}

   * @param plannerEntryReq
   */
  validateEntryRequest = async (
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<void> => {
    const planner = await this.plannerDao.getPlannerById(
      plannerEntryReq.plannerId
    )
    await this.mealDao.getMealById(plannerEntryReq.mealId)
    await this.mealTimeDao.getMealTimeById(plannerEntryReq.mealTimeId)
    this.checkPlannerRange(planner, plannerEntryReq)
    await this.checkDuplicateEntry(plannerEntryReq)
  }
  checkDuplicateEntry = async (plannerEntryReq: PlannerEntryDTORequest) => {
    const existentEntry = await PlannerEntry.findAll({
      where: {
        plannerId: plannerEntryReq.plannerId,
        mealId: plannerEntryReq.mealId,
        mealTimeId: plannerEntryReq.mealTimeId,
        mealDate: plannerEntryReq.mealDate,
      },
    })

    if (existentEntry?.length) {
      throw new HttpException(
        400,
        `Planner already has an entry with mealId #${plannerEntryReq.mealId} and MealTimeId #${plannerEntryReq.mealTimeId} for the date ${plannerEntryReq.mealDate} `,
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
    id: number,
    query: Query
  ): Promise<PlannerEntryDTOResponse[]> => {
    const plannerEntries = await this.plannerEntryDao.getPlannerEntries(
      id,
      query
    )

    return plannerEntries.map(entry => PlannerEntryMap.toDTO(entry))
  }
  getPlannerEntryById = async (
    entryId: number
  ): Promise<PlannerEntryDTOResponse> => {
    const entry = await this.plannerEntryDao.getPlannerEntryById(entryId)

    return PlannerEntryMap.toDTO(entry)
  }

  addEntrytoPlanner = async (
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerEntryDTOResponse> => {
    await this.validateEntryRequest(plannerEntryReq)
    const entry = await this.plannerEntryDao.create(plannerEntryReq)
    return PlannerEntryMap.toDTO(entry)
  }
  updatePlannerEntry = async (
    entryId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerEntryDTOResponse> => {
    await this.validateEntryRequest(plannerEntryReq)
    const entry = await this.plannerEntryDao.update(entryId, plannerEntryReq)
    return PlannerEntryMap.toDTO(entry)
  }
  deletePlannerEntry = async (entryId: number): Promise<string> => {
    const message = await this.plannerEntryDao.delete(entryId)
    return message
  }
}
