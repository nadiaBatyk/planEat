import { NextFunction, Request, Response } from 'express'
import { MealService } from '../services/meal.service'
import { MealDTORequest } from '../db/DTOs/meal.dto'
import { MealIngredientDTORequest } from '../db/DTOs/mealIngredient.dto'
import { MealFeatureDTORequest } from '../db/DTOs/mealFeature.dto'
import { Query } from '../common/types/query.types'

export class MealController {
  mealService: MealService
  constructor() {
    this.mealService = new MealService()
  }
  getMeals = async (
    query: Query,
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const meals = await this.mealService.getMeals(query)
      res.status(200).json(meals)
    } catch (error) {
      next(error)
    }
  }
  getMealById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const meal = await this.mealService.getMealById(+mealId)
      res.status(200).json(meal)
    } catch (error) {
      next(error)
    }
  }
  getMealIngredients = async (
    query: Query,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const ingredients = await this.mealService.getMealIngredients(
        +mealId,
        query
      )
      res.status(200).json(ingredients)
    } catch (error) {
      next(error)
    }
  }
  getMealIngredientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId, ingredientId } = req.params
      const ingredient = await this.mealService.getMealIngredientById(
        +mealId,
        +ingredientId
      )
      res.status(200).json(ingredient)
    } catch (error) {
      next(error)
    }
  }
  getMealFeatures = async (
    query: Query,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const features = await this.mealService.getMealFeatures(+mealId, query)
      res.status(200).json(features)
    } catch (error) {
      next(error)
    }
  }
  createMeal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newMeal: MealDTORequest = req.body
      const meal = await this.mealService.createMeal(newMeal)
      res.status(200).json(meal)
    } catch (error) {
      next(error)
    }
  }
  addMealIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const mealIngredientReq: MealIngredientDTORequest = req.body
      const newmealIngredient = await this.mealService.addMealIngredient(
        +mealId,
        mealIngredientReq
      )
      res.status(200).json(newmealIngredient)
    } catch (error) {
      next(error)
    }
  }
  deleteMealIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId, ingredientId } = req.params

      const updatedMeal = await this.mealService.deleteMealIngredient(
        +mealId,
        +ingredientId
      )
      res.status(200).json(updatedMeal)
    } catch (error) {
      next(error)
    }
  }
  updateMealIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId, ingredientId } = req.params
      const mealIngredientReq: MealIngredientDTORequest = req.body
      const updatedMealIngredient = await this.mealService.updateMealIngredient(
        +mealId,
        +ingredientId,
        mealIngredientReq
      )
      res.status(200).json(updatedMealIngredient)
    } catch (error) {
      next(error)
    }
  }
  updateMeal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const newMeal: MealDTORequest = req.body
      const meal = await this.mealService.updateMeal(+mealId, newMeal)
      res.status(200).json(meal)
    } catch (error) {
      next(error)
    }
  }
  deleteMeal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const message = await this.mealService.deleteMeal(+mealId)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
  addMealFeature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const mealFeatureReq: MealFeatureDTORequest = req.body
      const newmealFeature = await this.mealService.addMealFeature(
        +mealId,
        mealFeatureReq
      )
      res.status(200).json(newmealFeature)
    } catch (error) {
      next(error)
    }
  }
  deleteMealFeature = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId, featureId } = req.params

      const updatedMeal = await this.mealService.deleteMealFeature(
        +mealId,
        +featureId
      )
      res.status(200).json(updatedMeal)
    } catch (error) {
      next(error)
    }
  }
  getMealFeatureById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId, featureId } = req.params
      const feature = await this.mealService.getMealFeatureById(
        +mealId,
        +featureId
      )
      res.status(200).json(feature)
    } catch (error) {
      next(error)
    }
  }
}
