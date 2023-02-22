import { MealDao } from '../db/DAOs/meal.dao'
import { MealDTO } from '../db/DTOs/meal.dto'
import { MealMap } from '../db/mappers/meal.map'

export class MealService {
  mealDao: MealDao
  constructor() {
    this.mealDao = new MealDao()
  }
  async getMeals() {}
  async getMealById(id: number) {
    const meal = await this.mealDao.getMealById(id)
    return MealMap.toDTO(meal)
  }
  async createMeal(meal: MealDTO): Promise<MealDTO> {
    const newMeal = await this.mealDao.create(meal)
    return MealMap.toDTO(newMeal)
  }
  async updateMeal() {}
  async deleteMeal() {}
}
