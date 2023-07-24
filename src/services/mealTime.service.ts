import { Query } from '../common/types/query.types'
import { MealTimeDao } from '../db/DAOs/classes/mealTime.dao'
import {
  MealTimeDTORequest,
  MealTimeDTOResponse,
} from '../db/DTOs/mealTime.dto'
import { MealTimeMap } from '../db/mappers/mealTime.map'

export class MealTimeService {
  mealTimeDao: MealTimeDao
  constructor() {
    this.mealTimeDao = new MealTimeDao()
  }
  getMealTimes = async (query: Query): Promise<MealTimeDTOResponse[]> => {
    const mealTimes = await this.mealTimeDao.getMealTimes(query)
    return mealTimes.map(m => MealTimeMap.toDTO(m))
  }
  getMealTimeById = async (id: number): Promise<MealTimeDTOResponse> => {
    const mealTime = await this.mealTimeDao.getMealTimeById(id)
    return MealTimeMap.toDTO(mealTime)
  }
  createMealTime = async (
    mealTime: MealTimeDTORequest
  ): Promise<MealTimeDTOResponse> => {
    const newMeal = await this.mealTimeDao.create(mealTime)
    return MealTimeMap.toDTO(newMeal)
  }
  updateMealTime = async (
    id: number,
    mealTime: MealTimeDTOResponse
  ): Promise<MealTimeDTOResponse> => {
    const updatedMealTime = await this.mealTimeDao.update(id, mealTime)
    return MealTimeMap.toDTO(updatedMealTime)
  }
  deleteMealTime = async (id: number): Promise<string> => {
    const message = await this.mealTimeDao.delete(id)
    return message
  }
}
