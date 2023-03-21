import HttpException from '../../../common/error/HttpException'
import { PlannerEntryDTORequest } from '../../DTOs/plannerEntry.dto'
import { Meal } from '../../models/Meal'
import { MealTime } from '../../models/MealTime'
import { PlannerEntry } from '../../models/PlannerEntry'
import { IPlannerEntryDao } from '../interfaces/plannerEntryDao.interface'

export class PlannerEntryDao implements IPlannerEntryDao {
  getPlannerEntryById = async (id: number): Promise<PlannerEntry> => {
    try {
      const entry = await PlannerEntry.findByPk(id, {
        include: [
          {
            model: Meal,
          },
          {
            model: MealTime,
          },
        ],
      })

      if (entry) {
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
  getPlannerEntries = async (): Promise<PlannerEntry[]> => {
    try {
      const entries = await PlannerEntry.findAll({
        include: [
          {
            model: Meal,
          },
          {
            model: MealTime,
          },
        ],

        order: [['id', 'ASC']],
      })

      return entries
    } catch (error) {
      throw error
    }
  }
  delete = async (id: number): Promise<string> => {
    try {
      const rowNumber = await PlannerEntry.destroy({
        where: { id: id },
      })
      if (rowNumber) {
        return `Entry #${id} has been succesfully deleted`
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
  create = async (t: PlannerEntryDTORequest): Promise<PlannerEntry> => {
    try {
      const planner = await PlannerEntry.create({ ...t })
      return planner.dataValues
    } catch (error) {
      throw error
    }
  }

  update = async (
    id: number,
    m: PlannerEntryDTORequest
  ): Promise<PlannerEntry> => {
    try {
      const entry = await PlannerEntry.findByPk(id)
      if (entry) {
        entry.set(m)
        await entry.save()
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
}
