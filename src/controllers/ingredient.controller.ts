import { NextFunction, Request, Response } from 'express'
import { IngredientService } from '../services/ingredient.service'
import { IngredientDTO } from '../db/DTOs/ingredient.dto'

export class IngredientController {
  ingredientService: IngredientService = new IngredientService()

  getIngredients = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const ingredients = await this.ingredientService.getIngredients()
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
      const { id } = req.params
      const ingredient = await this.ingredientService.getIngredientById(+id)
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
      const newIngredient: IngredientDTO = req.body
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
      const { id } = req.params
      const newIngredient: IngredientDTO = req.body
      const ingredient = await this.ingredientService.updateIngredient(
        +id,
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
      const { id } = req.params
      const message = await this.ingredientService.deleteIngredient(+id)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
