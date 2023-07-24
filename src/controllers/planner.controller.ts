import { NextFunction, Request, Response } from 'express'
import { PlannerService } from '../services/planner.service'
import { PlannerDTORequest } from '../db/DTOs/planner.dto'
import { Query } from '../common/types/query.types'

export class PlannerController {
  plannerService: PlannerService
  constructor() {
    this.plannerService = new PlannerService()
  }
  getPlanners = async (
    query: Query,
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const planners = await this.plannerService.getPlanners(query)
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
      const { plannerId } = req.params
      const message = await this.plannerService.deletePlanner(+plannerId)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
