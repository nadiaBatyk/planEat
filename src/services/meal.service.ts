import { MealDao } from '../db/DAOs/classes/meal.dao'
import { FeatureDTO } from '../db/DTOs/feature.dto'
import { IngredientDTO } from '../db/DTOs/ingredient.dto'
import { MealDTO } from '../db/DTOs/meal.dto'
import { MealIngredientDTO } from '../db/DTOs/mealIngredient.dto'
import { FeatureMap } from '../db/mappers/feature.map'
import { IngredientMap } from '../db/mappers/ingredient.map'
import { MealMap } from '../db/mappers/meal.map'

export class MealService {
  mealDao: MealDao
  constructor() {
    this.mealDao = new MealDao()
  }
  getMeals = async (): Promise<MealDTO[]> => {
    const meals = await this.mealDao.getMeals()
    return meals.map(m => MealMap.toDTO(m))
  }
  getMealById = async (id: number): Promise<MealDTO> => {
    const meal = await this.mealDao.getMealById(id)
    return meal
  }
  getMealIngredients = async (id: number): Promise<IngredientDTO[]> => {
    const ingredients = await this.mealDao.getMealIngredients(id)
    return ingredients.map(i => IngredientMap.toDTO(i.dataValues))
  }
  getMealFeatures = async (id: number): Promise<FeatureDTO[]> => {
    const features = await this.mealDao.getMealFeatures(id)
    return features.map(i => FeatureMap.toDTO(i.dataValues))
  }
  createMeal = async (meal: MealDTO): Promise<MealDTO> => {
    const newMeal = await this.mealDao.create(meal)
    return MealMap.toDTO(newMeal)
  }
  addMealIngredient = async (
    mealIngredient: MealIngredientDTO
  ): Promise<MealDTO> => {
    const meal = await this.mealDao.addIngredientToMeal(mealIngredient)
    return MealMap.toDTO(meal)
  }
  updateMeal = async (id: number, meal: MealDTO): Promise<MealDTO> => {
    const updatedMeal = await this.mealDao.update(id, meal)
    return MealMap.toDTO(updatedMeal)
  }
  deleteMeal = async (id: number): Promise<string> => {
    const message = await this.mealDao.delete(id)
    return message
  }
}
