import { NextFunction, Request, Response } from 'express'

import { MealService } from '../services/mealService'
import { IMeal } from '../interfaces/meal.interface'

export class MealController {
  mealService: MealService
  constructor() {
    this.mealService = new MealService()
  }
  async getMeals(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.send()
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
  async createMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newMeal: IMeal = req.body
      const meal = await this.mealService.createMeal(newMeal)
      res.status(200).json(meal)
    } catch (error) {
      next(error)
    }
  }
  async updateMeal() {}
  async deleteMeal() {}
}
