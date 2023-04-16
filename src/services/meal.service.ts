import { Query } from '../common/types/query.types'
import { MealDao } from '../db/DAOs/classes/meal.dao'
import { FeatureDTOResponse } from '../db/DTOs/feature.dto'
import { IngredientDTOResponse } from '../db/DTOs/ingredient.dto'
import { MealDTORequest, MealDTOResponse } from '../db/DTOs/meal.dto'
import { MealFeatureDTORequest } from '../db/DTOs/mealFeature.dto'
import { MealIngredientDTORequest } from '../db/DTOs/mealIngredient.dto'
import { FeatureMap } from '../db/mappers/feature.map'
import { IngredientMap } from '../db/mappers/ingredient.map'
import { MealMap } from '../db/mappers/meal.map'

export class MealService {
  mealDao: MealDao
  constructor() {
    this.mealDao = new MealDao()
  }
  getMeals = async (query: Query): Promise<MealDTOResponse[]> => {
    const meals = await this.mealDao.getMeals(query)
    return meals.map(m => MealMap.toDTO(m))
  }
  getMealById = async (id: number): Promise<MealDTOResponse> => {
    const meal = await this.mealDao.getMealById(id)
    return MealMap.toDTO(meal)
  }
  getMealIngredients = async (id: number): Promise<IngredientDTOResponse[]> => {
    const meal = await this.mealDao.getMealById(id)
    return meal.ingredients.map(i => IngredientMap.toDTO(i))
  }
  getMealIngredientById = async (
    mealId: number,
    ingredientId: number
  ): Promise<IngredientDTOResponse> => {
    const ingredient = await this.mealDao.getMealIngredientById(
      mealId,
      ingredientId
    )
    return IngredientMap.toDTO(ingredient)
  }
  getMealFeatures = async (id: number): Promise<FeatureDTOResponse[]> => {
    const meal = await this.mealDao.getMealById(id)
    return meal.features.map(i => FeatureMap.toDTO(i))
  }
  createMeal = async (meal: MealDTORequest): Promise<MealDTOResponse> => {
    const newMeal = await this.mealDao.create(meal)
    return MealMap.toDTO(newMeal)
  }
  addMealIngredient = async (
    mealId: number,
    mealIngredientReq: MealIngredientDTORequest
  ): Promise<MealDTOResponse> => {
    const meal = await this.mealDao.addIngredientToMeal(
      mealId,
      mealIngredientReq
    )
    return MealMap.toDTO(meal)
  }
  deleteMealIngredient = async (
    mealId: number,
    ingredientId: number
  ): Promise<MealDTOResponse> => {
    const meal = await this.mealDao.removeIngredientFromMeal(
      mealId,
      ingredientId
    )
    return MealMap.toDTO(meal)
  }
  updateMeal = async (
    id: number,
    meal: MealDTORequest
  ): Promise<MealDTOResponse> => {
    const updatedMeal = await this.mealDao.update(id, meal)
    return MealMap.toDTO(updatedMeal)
  }
  deleteMeal = async (id: number): Promise<string> => {
    const message = await this.mealDao.delete(id)
    return message
  }
  addMealFeature = async (
    mealId: number,
    mealFeature: MealFeatureDTORequest
  ): Promise<MealDTOResponse> => {
    const meal = await this.mealDao.addFeatureToMeal(mealId, mealFeature)
    return MealMap.toDTO(meal)
  }
  deleteMealFeature = async (
    mealId: number,
    featureId: number
  ): Promise<MealDTOResponse> => {
    const meal = await this.mealDao.removeFeatureFromMeal(mealId, featureId)
    return MealMap.toDTO(meal)
  }
  getMealFeatureById = async (
    mealId: number,
    featureId: number
  ): Promise<FeatureDTOResponse> => {
    const feature = await this.mealDao.getMealFeatureById(mealId, featureId)
    return FeatureMap.toDTO(feature)
  }
}
