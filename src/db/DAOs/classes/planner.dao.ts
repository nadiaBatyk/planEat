import HttpException from '../../../common/error/HttpException'
import { PlannerDTORequest } from '../../DTOs/planner.dto'
import { PlannerEntryDTORequest } from '../../DTOs/plannerEntry.dto'
import { Meal } from '../../models/Meal'
import { MealType } from '../../models/MealType'
import { Planner } from '../../models/Planner'
import { PlannerEntry } from '../../models/PlannerEntry'
import { IPlannerDao } from '../interfaces/plannerDao.interface'

export class PlannerDao implements IPlannerDao {
  //PLANNER CRUD
  getPlannerById = async (id: number): Promise<Planner> => {
    try {
      const planner = await Planner.findByPk(id, {
        include: {
          model: PlannerEntry,
          include: [
            {
              model: Meal,
            },
            {
              model: MealType,
            },
          ],
        },
      })

      if (planner) {
        return planner
      }
      throw new HttpException(
        404,
        `Planner with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getPlanners = async (): Promise<Planner[]> => {
    try {
      const planner = await Planner.findAll({
        include: {
          model: PlannerEntry,
          include: [
            {
              model: Meal,
            },
            {
              model: MealType,
            },
          ],
        },
        order: [['id', 'ASC']],
      })
      console.log(planner)

      return planner
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      const rowNumber = await Planner.destroy({
        where: { id: id },
      })
      if (rowNumber) {
        return `Planner #${id} has been succesfully deleted`
      }
      throw new HttpException(
        404,
        `Planner with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  create = async (t: PlannerDTORequest): Promise<Planner> => {
    try {
      const planner = await Planner.create({ ...t })
      return planner.dataValues
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: PlannerDTORequest): Promise<Planner> => {
    try {
      const planner = await Planner.findByPk(id)
      if (planner) {
        planner.set(m)
        await planner.save()
        return planner.dataValues
      }

      throw new HttpException(
        404,
        `Planner with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  //PLANNER ENTRIES CRUD
  addEntryToPlanner = async (
    planner: Planner,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<Planner> => {
    const plannerId = planner.id
    try {
      await PlannerEntry.create({
        plannerId,
        ...plannerEntryReq,
      })
      //await planner.$add('plannerEntry', entry)
      return await this.getPlannerById(plannerId)
    } catch (error) {
      throw error
    }
  }
  getPlannerEntryById = async (
    plannerId: number,
    entryId: number
  ): Promise<PlannerEntry> => {
    try {
      const planner = await this.getPlannerById(plannerId)
      const entry = planner.plannerEntries.find(value => value.id === entryId)
      if (entry) {
        return entry
      }
      throw new HttpException(
        404,
        `Entry with id ${entryId} does not exist on planner #${plannerId}`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  updateEntryFromPlanner = async (
    plannerId: number,
    entryId: number,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<PlannerEntry> => {
    try {
      const plannerEntry = await PlannerEntry.findByPk(entryId)
      if (plannerEntry) {
        plannerEntry.set({ plannerId, ...plannerEntryReq })
        await plannerEntry.save()
        return plannerEntry
      }

      throw new HttpException(
        404,
        `plannerEntry with id ${entryId} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }

  removeEntryFromPlanner = async (
    plannerId: number,
    entryId: number
  ): Promise<Planner> => {
    try {
      const planner = await this.getPlannerById(plannerId)
      const entry = await this.getPlannerEntryById(plannerId, entryId)
      if (planner && entry) {
        await planner.$remove('plannerEntry', entry)

        return await this.getPlannerById(plannerId)
      }

      throw new HttpException(
        500,
        `Couldn't delete entry from planner`,
        'Server error'
      )
    } catch (error) {
      throw error
    }
  }
}
