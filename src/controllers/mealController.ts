import { NextFunction, Request, Response } from 'express'

import { MealService } from '../services/mealService'

import { MealDTO } from '../db/DTOs/meal.dto'

export class MealController {
  mealService: MealService
  constructor() {
    this.mealService = new MealService()
    this.getMealById = this.getMealById.bind(this)
  }
  getMeals = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log('llamo')

      const meals = await this.mealService.getMeals()
      console.log(meals)

      res.status(200).json(meals)
    } catch (error) {
      next(error)
    }
  }
  async getMealById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params
      const meal = await this.mealService.getMealById(+id)
      res.status(200).json(meal)
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
  async updateMeal() {}
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
