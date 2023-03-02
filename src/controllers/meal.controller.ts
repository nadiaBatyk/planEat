import { NextFunction, Request, Response } from 'express'

import { MealService } from '../services/meal.service'

import { MealDTO } from '../db/DTOs/meal.dto'
import { MealIngredientDTO } from '../db/DTOs/mealIngredient.dto'

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
      const { id } = req.params
      const ingredients = await this.mealService.getMealIngredients(+id)
      res.status(200).json(ingredients)
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
      const { id } = req.params
      const features = await this.mealService.getMealFeatures(+id)
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
      const { id } = req.params
      const mealIngredient: MealIngredientDTO = req.body
      mealIngredient.mealId = +id
      const newmealIngredient = await this.mealService.addMealIngredient(
        mealIngredient
      )
      res.status(200).json(newmealIngredient)
    } catch (error) {
      next(error)
    }
  }
  //TODO ADD INGREDIENTS TO MEAL PATCH?? O PUT???
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
}
