import { NextFunction, Request, Response } from 'express'
import { MealTypeService } from '../services/mealType.service'
import { MealTypeDTORequest } from '../db/DTOs/mealType.dto'

export class MealTypeController {
  mealTypeService: MealTypeService
  constructor() {
    this.mealTypeService = new MealTypeService()
  }
  getMealTypes = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const mealTypes = await this.mealTypeService.getMealTypes()
      res.status(200).json(mealTypes)
    } catch (error) {
      next(error)
    }
  }
  getMealTypeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTypeId } = req.params
      const mealType = await this.mealTypeService.getMealTypeById(+mealTypeId)
      res.status(200).json(mealType)
    } catch (error) {
      next(error)
    }
  }
  getMealsInType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTypeId } = req.params
      const meals = await this.mealTypeService.getMealsInType(+mealTypeId)
      res.status(200).json(meals)
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
  createType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newMealType: MealTypeDTORequest = req.body
      const mealType = await this.mealTypeService.createMealType(newMealType)
      res.status(200).json(mealType)
    } catch (error) {
      next(error)
    }
  }
  updateMealType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTypeId } = req.params
      const newMealType: MealTypeDTORequest = req.body
      const mealType = await this.mealTypeService.updateMealType(
        +mealTypeId,
        newMealType
      )
      res.status(200).json(mealType)
    } catch (error) {
      next(error)
    }
  }
  deleteMealType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { mealTypeId } = req.params
      const message = await this.mealTypeService.deleteMealType(+mealTypeId)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
