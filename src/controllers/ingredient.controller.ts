import { NextFunction, Request, Response } from 'express'
import { IngredientService } from '../services/ingredient.service'
import { IngredientDTORequest } from '../db/DTOs/ingredient.dto'

export class IngredientController {
  ingredientService: IngredientService = new IngredientService()

  getIngredients = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ingredients = await this.ingredientService.getIngredients(
        res.locals.queryParamsHandler
      )
      res.status(200).json(ingredients)
    } catch (error) {
      next(error)
    }
  }
  getIngredientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredientId } = req.params
      const ingredient = await this.ingredientService.getIngredientById(
        +ingredientId
      )
      res.status(200).json(ingredient)
    } catch (error) {
      next(error)
    }
  }
  createIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newIngredient: IngredientDTORequest = req.body
      const ingredient = await this.ingredientService.createIngredient(
        newIngredient
      )
      res.status(200).json(ingredient)
    } catch (error) {
      next(error)
    }
  }
  updateIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredientId } = req.params
      const newIngredient: IngredientDTORequest = req.body
      const ingredient = await this.ingredientService.updateIngredient(
        +ingredientId,
        newIngredient
      )
      res.status(200).json(ingredient)
    } catch (error) {
      next(error)
    }
  }
  deleteIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredientId } = req.params
      const message = await this.ingredientService.deleteIngredient(
        +ingredientId
      )
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
