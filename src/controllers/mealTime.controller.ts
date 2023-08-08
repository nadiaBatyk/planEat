import { NextFunction, Request, Response } from 'express'
import { MealTimeService } from '../services/mealTime.service'
import { MealTimeDTORequest } from '../db/DTOs/mealTime.dto'

export class MealTimeController {
  mealTimeService: MealTimeService
  constructor() {
    this.mealTimeService = new MealTimeService()
  }
  getMealTimes = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const mealTimes = await this.mealTimeService.getMealTimes(
        res.locals.queryParamsHandler
      )
      res.status(200).json(mealTimes)
    } catch (error) {
      next(error)
    }
  }
  getMealTimeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTimeId } = req.params
      const mealTime = await this.mealTimeService.getMealTimeById(+mealTimeId)
      res.status(200).json(mealTime)
    } catch (error) {
      next(error)
    }
  }
  createType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newMealTime: MealTimeDTORequest = req.body
      const mealTime = await this.mealTimeService.createMealTime(newMealTime)
      res.status(200).json(mealTime)
    } catch (error) {
      next(error)
    }
  }
  updateMealTime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTimeId } = req.params
      const newMealTime: MealTimeDTORequest = req.body
      const MealTime = await this.mealTimeService.updateMealTime(
        +mealTimeId,
        newMealTime
      )
      res.status(200).json(MealTime)
    } catch (error) {
      next(error)
    }
  }
  deleteMealTime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTimeId } = req.params
      const message = await this.mealTimeService.deleteMealTime(+mealTimeId)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
