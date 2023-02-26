import { NextFunction, Request, Response } from 'express'

import { MealService } from '../services/mealService'

import { MealDTO } from '../db/DTOs/meal.dto'

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
  getMealIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const ingredients = await this.mealService.getMealIngredients(+id)
      res.status(200).json(ingredients)
    } catch (error) {
      console.log(error)

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
