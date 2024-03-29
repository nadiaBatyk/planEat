import { Query } from '../common/types/query.types'
import { MealDao } from '../db/DAOs/classes/meal.dao'
import { FeatureDTOResponse } from '../db/DTOs/feature.dto'
import { IngredientDTOResponse } from '../db/DTOs/ingredient.dto'
import { MealDTORequest, MealDTOResponse } from '../db/DTOs/meal.dto'
import {
  MealFeatureDTORequest,
  MealFeatureDTOResponse,
} from '../db/DTOs/mealFeature.dto'
import {
  MealIngredientDTORequest,
  MealIngredientDTOResponse,
} from '../db/DTOs/mealIngredient.dto'
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
  getMealIngredients = async (
    id: number,
    query: Query
  ): Promise<IngredientDTOResponse[]> => {
    const ingredients = await this.mealDao.getMealIngredients(id, query)
    return ingredients.map(i => IngredientMap.toDTO(i))
  }
  getMealIngredientById = async (
    mealId: number,
    ingredientId: number
  ): Promise<MealIngredientDTOResponse> => {
    const ingredient = await this.mealDao.getMealIngredientById(
      mealId,
      ingredientId
    )
    return ingredient
  }
  getMealFeatures = async (
    id: number,
    query: Query
  ): Promise<FeatureDTOResponse[]> => {
    const features = await this.mealDao.getMealFeatures(id, query)
    return features.map(i => FeatureMap.toDTO(i))
  }
  createMeal = async (meal: MealDTORequest): Promise<MealDTOResponse> => {
    const newMeal = await this.mealDao.create(meal)
    return MealMap.toDTO(newMeal)
  }
  addMealIngredient = async (
    mealId: number,
    mealIngredientReq: MealIngredientDTORequest
  ): Promise<MealIngredientDTOResponse> => {
    const meal = await this.mealDao.addIngredientToMeal(
      mealId,
      mealIngredientReq
    )
    return meal
  }
  deleteMealIngredient = async (
    mealId: number,
    ingredientId: number
  ): Promise<string> => {
    const message = await this.mealDao.removeIngredientFromMeal(
      mealId,
      ingredientId
    )
    return message
  }
  updateMeal = async (
    id: number,
    meal: MealDTORequest
  ): Promise<MealDTOResponse> => {
    const updatedMeal = await this.mealDao.update(id, meal)
    return MealMap.toDTO(updatedMeal)
  }
  updateMealIngredient = async (
    mealId: number,
    ingredientId: number,
    mealIngredientReq: MealIngredientDTORequest
  ): Promise<MealIngredientDTOResponse> => {
    const updatedMealIngredient = await this.mealDao.updateMealIngredient(
      mealId,
      ingredientId,
      mealIngredientReq
    )
    return updatedMealIngredient
  }
  deleteMeal = async (id: number): Promise<string> => {
    const message = await this.mealDao.delete(id)
    return message
  }
  addMealFeature = async (
    mealId: number,
    mealFeature: MealFeatureDTORequest
  ): Promise<MealFeatureDTOResponse> => {
    const meal = await this.mealDao.addFeatureToMeal(mealId, mealFeature)
    return meal
  }
  updateMealFeature = async (
    mealId: number,
    featureId: number,
    mealFeatureReq: MealFeatureDTORequest
  ): Promise<MealFeatureDTOResponse> => {
    const updatedMealFeature = await this.mealDao.updateMealFeature(
      mealId,
      featureId,
      mealFeatureReq
    )
    return updatedMealFeature
  }
  deleteMealFeature = async (
    mealId: number,
    featureId: number
  ): Promise<string> => {
    const message = await this.mealDao.removeFeatureFromMeal(mealId, featureId)
    return message
  }
  getMealFeatureById = async (
    mealId: number,
    featureId: number
  ): Promise<MealFeatureDTOResponse> => {
    const feature = await this.mealDao.getMealFeatureById(mealId, featureId)
    return feature
  }
}
