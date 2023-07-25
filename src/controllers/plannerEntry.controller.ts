import { NextFunction, Request, Response } from 'express'
import { PlannerEntryService } from '../services/plannerEntry.service'
import { PlannerEntryDTORequest } from '../db/DTOs/plannerEntry.dto'
import { Query } from '../common/types/query.types'

export class PlannerEntryController {
  plannerEntryService: PlannerEntryService
  constructor() {
    this.plannerEntryService = new PlannerEntryService()
  }

  getPlannerEntries = async (
    query: Query,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { plannerId } = req.params
      const entries = await this.plannerEntryService.getPlannerEntries(
        +plannerId,
        query
      )
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
      const entry = await this.plannerEntryService.getPlannerEntryById(+entryId)
      res.status(200).json(entry)
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
      const plannerEntryReq: PlannerEntryDTORequest = req.body
      const newplannerMeal = await this.plannerEntryService.addEntrytoPlanner(
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
      const { entryId } = req.params
      const plannerEntryReq: PlannerEntryDTORequest = req.body
      const updatedPlannerEntry =
        await this.plannerEntryService.updatePlannerEntry(
          +entryId,
          plannerEntryReq
        )
      res.status(200).json(updatedPlannerEntry)
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
      const message = await this.plannerEntryService.deletePlannerEntry(
        +entryId
      )
      res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
}
