import { NextFunction, Request, Response } from 'express'
import { PlannerService } from '../services/planner.service'
import { PlannerDTORequest } from '../db/DTOs/planner.dto'
import { PlannerMealDTORequest } from '../db/DTOs/plannerEntry.dto'

export class PlannerController {
  plannerService: PlannerService
  constructor() {
    this.plannerService = new PlannerService()
  }
  getPlanners = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const planners = await this.plannerService.getPlanners()
      res.status(200).json(planners)
    } catch (error) {
      next(error)
    }
  }
  getPlannerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const planner = await this.plannerService.getPlannerById(+plannerId)
      res.status(200).json(planner)
    } catch (error) {
      next(error)
    }
  }
  getPlannerIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const meals = await this.plannerService.getPlannerMeals(+plannerId)
      res.status(200).json(meals)
    } catch (error) {
      next(error)
    }
  }
  createPlanner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newPlanner: PlannerDTORequest = req.body
      const planner = await this.plannerService.createPlanner(newPlanner)
      res.status(200).json(planner)
    } catch (error) {
      next(error)
    }
  }
  addMealToPlanner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const plannerMealReq: PlannerMealDTORequest = req.body
      const newplannerMeal = await this.plannerService.addMealtoPlanner(
        +plannerId,
        plannerMealReq
      )
      res.status(200).json(newplannerMeal)
    } catch (error) {
      next(error)
    }
  }
  getPlannerMeals = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const meals = await this.plannerService.getPlannerMeals(+plannerId)
      res.status(200).json(meals)
    } catch (error) {
      next(error)
    }
  }
  updatePlanner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const newPlanner: PlannerDTORequest = req.body
      const planner = await this.plannerService.updatePlanner(
        +plannerId,
        newPlanner
      )
      res.status(200).json(planner)
    } catch (error) {
      next(error)
    }
  }
  deletePlanner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const message = await this.plannerService.deletePlanner(+id)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
