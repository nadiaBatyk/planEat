import { MealTypeDao } from '../db/DAOs/mealType.dao'
import { MealDTO } from '../db/DTOs/meal.dto'
import { MealTypeDTO } from '../db/DTOs/mealType.dto'
import { MealMap } from '../db/mappers/meal.map'
import { MealTypeMap } from '../db/mappers/mealType.map'

export class MealTypeService {
  mealTypeDao: MealTypeDao
  constructor() {
    this.mealTypeDao = new MealTypeDao()
  }
  getMealTypes = async (): Promise<MealTypeDTO[]> => {
    const mealTypes = await this.mealTypeDao.getMealTypes()
    return mealTypes.map(m => MealTypeMap.toDTO(m))
  }
  getMealTypeById = async (id: number): Promise<MealTypeDTO> => {
    const mealType = await this.mealTypeDao.getMealTypeById(id)
    return MealTypeMap.toDTO(mealType)
  }
  getMealsInType = async (id: number): Promise<MealDTO[]> => {
    const meals = await this.mealTypeDao.getMealsInType(id)
    return meals.map(m => MealMap.toDTO(m))
  }
  createMealType = async (mealType: MealTypeDTO): Promise<MealTypeDTO> => {
    const newMeal = await this.mealTypeDao.create(mealType)
    return MealTypeMap.toDTO(newMeal)
  }
  updateMealType = async (
    id: number,
    mealType: MealTypeDTO
  ): Promise<MealTypeDTO> => {
    const updatedMealType = await this.mealTypeDao.update(id, mealType)
    return MealTypeMap.toDTO(updatedMealType)
  }
  deleteMealType = async (id: number): Promise<string> => {
    const message = await this.mealTypeDao.delete(id)
    return message
  }
}
