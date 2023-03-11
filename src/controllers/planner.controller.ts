import { NextFunction, Request, Response } from 'express'
import { PlannerService } from '../services/planner.service'
import { PlannerDTORequest } from '../db/DTOs/planner.dto'
import { PlannerEntryDTORequest } from '../db/DTOs/plannerEntry.dto'

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
  getPlannerEntries = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const entries = await this.plannerService.getPlannerEntries(+plannerId)
      res.status(200).json(entries)
    } catch (error) {
      next(error)
    }
  }
  getPlannerEntryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { entryId } = req.params
      const entry = await this.plannerService.getPlannerEntryById(+entryId)
      res.status(200).json(entry)
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
      const plannerEntryReq: PlannerEntryDTORequest = req.body
      const newplannerMeal = await this.plannerService.addEntrytoPlanner(
        +plannerId,
        plannerEntryReq
      )
      res.status(200).json(newplannerMeal)
    } catch (error) {
      next(error)
    }
  }
  updatePlannerEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId, entryId } = req.params
      const plannerEntryReq: PlannerEntryDTORequest = req.body
      const updatedPlannerEntry = await this.plannerService.updatePlannerEntry(
        +plannerId,
        +entryId,
        plannerEntryReq
      )
      res.status(200).json(updatedPlannerEntry)
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
  deletePlannerEntry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { entryId } = req.params
      const message = await this.plannerService.deletePlannerEntry(+entryId)
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
