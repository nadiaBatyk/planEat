import { MealTypeDao } from '../db/DAOs/classes/mealType.dao'
import { MealDTOResponse } from '../db/DTOs/meal.dto'
import {
  MealTypeDTORequest,
  MealTypeDTOResponse,
} from '../db/DTOs/mealType.dto'
import { MealMap } from '../db/mappers/meal.map'
import { MealTypeMap } from '../db/mappers/mealType.map'

export class MealTypeService {
  mealTypeDao: MealTypeDao
  constructor() {
    this.mealTypeDao = new MealTypeDao()
  }
  getMealTypes = async (): Promise<MealTypeDTOResponse[]> => {
    const mealTypes = await this.mealTypeDao.getMealTypes()
    return mealTypes.map(m => MealTypeMap.toDTO(m))
  }
  getMealTypeById = async (id: number): Promise<MealTypeDTOResponse> => {
    const mealType = await this.mealTypeDao.getMealTypeById(id)
    return MealTypeMap.toDTO(mealType)
  }
  getMealsInType = async (id: number): Promise<MealDTOResponse[]> => {
    const meals = await this.mealTypeDao.getMealsInType(id)
    return meals.map(m => MealMap.toDTO(m))
  }
  createMealType = async (
    mealType: MealTypeDTORequest
  ): Promise<MealTypeDTOResponse> => {
    const newMeal = await this.mealTypeDao.create(mealType)
    return MealTypeMap.toDTO(newMeal)
  }
  updateMealType = async (
    id: number,
    mealType: MealTypeDTOResponse
  ): Promise<MealTypeDTOResponse> => {
    const updatedMealType = await this.mealTypeDao.update(id, mealType)
    return MealTypeMap.toDTO(updatedMealType)
  }
  deleteMealType = async (id: number): Promise<string> => {
    const message = await this.mealTypeDao.delete(id)
    return message
  }
}
