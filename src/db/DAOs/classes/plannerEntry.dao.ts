import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
import { PlannerEntryDTORequest } from '../../DTOs/plannerEntry.dto'
import { Meal } from '../../models/Meal'
import { MealTime } from '../../models/MealTime'
import { PlannerEntry } from '../../models/PlannerEntry'
import { IPlannerEntryDao } from '../interfaces/plannerEntryDao.interface'

export class PlannerEntryDao implements IPlannerEntryDao {
  getPlannerEntryById = async (id: number): Promise<PlannerEntry> => {
    try {
      console.log('HOLIS PLANNER IDSSS')

      const entry = await PlannerEntry.findByPk(id, {
        include: [
          {
            model: Meal,
            attributes: ['name'],
          },
          {
            model: MealTime,
            attributes: ['name'],
          },
        ],
      })

      if (entry) {
        console.log(entry)

        return entry
      }
      throw new HttpException(
        404,
        `Entry with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getPlannerEntries = async (
    plannerId: number,
    query: Query
  ): Promise<PlannerEntry[]> => {
    try {
      const entries = await PlannerEntry.findAll({
        where: { plannerId: plannerId },
        include: [
          {
            model: Meal,
            attributes: ['name'],
          },
          {
            model: MealTime,
            attributes: ['name'],
          },
        ],
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })

      return entries
    } catch (error) {
      throw error
    }
  }
  delete = async (id: number): Promise<string> => {
    try {
      await this.getPlannerEntryById(id)
      await PlannerEntry.destroy({
        where: { id: id },
      })
      return `Entry #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (
    newPlannerEntry: PlannerEntryDTORequest
  ): Promise<PlannerEntry> => {
    try {
      const plannerEntry = await PlannerEntry.create({ ...newPlannerEntry })
      return await this.getPlannerEntryById(plannerEntry.id)
    } catch (error) {
      throw error
    }
  }

  update = async (
    id: number,
    newPlannerEntry: PlannerEntryDTORequest
  ): Promise<PlannerEntry> => {
    try {
      const entry = await this.getPlannerEntryById(id)
      entry.set(newPlannerEntry)
      await entry.save()
      return await this.getPlannerEntryById(entry.id)
    } catch (error) {
      throw error
    }
  }
}
