import { NextFunction, Request, Response } from 'express'

import { MealService } from '../services/meal.service'

import { MealDTO } from '../db/DTOs/meal.dto'
import { MealIngredientDTO } from '../db/DTOs/mealIngredient.dto'
import { MealFeatureDTO } from '../db/DTOs/mealFeature.dto'

export class MealController {
  mealService: MealService
  constructor() {
    this.mealService = new MealService()
  }
  getMeals = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const meals = await this.mealService.getMeals()
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
      const { id } = req.params
      const meal = await this.mealService.getMealById(+id)
      res.status(200).json(meal)
    } catch (error) {
      next(error)
    }
  }
  getMealIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const ingredients = await this.mealService.getMealIngredients(+mealId)
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealId } = req.params
      const features = await this.mealService.getMealFeatures(+mealId)
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
      const newMeal: MealDTO = req.body
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
      const mealIngredient: MealIngredientDTO = req.body
      mealIngredient.mealId = +mealId
      const newmealIngredient = await this.mealService.addMealIngredient(
        mealIngredient
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
  updateMeal = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const newMeal: MealDTO = req.body
      const meal = await this.mealService.updateMeal(+id, newMeal)
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
      const { id } = req.params
      const message = await this.mealService.deleteMeal(+id)
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
      const mealFeature: MealFeatureDTO = req.body
      mealFeature.mealId = +mealId
      const newmealFeature = await this.mealService.addMealFeature(mealFeature)
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