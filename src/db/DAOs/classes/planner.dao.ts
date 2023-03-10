import HttpException from '../../../common/error/HttpException'
import { PlannerDTORequest } from '../../DTOs/planner.dto'
import { PlannerEntryDTORequest } from '../../DTOs/plannerEntry.dto'
import { Meal } from '../../models/Meal'
import { MealType } from '../../models/MealType'
import { Planner } from '../../models/Planner'
import { PlannerEntry } from '../../models/PlannerEntry'
import { IPlannerDao } from '../interfaces/plannerDao.interface'

export class PlannerDao implements IPlannerDao {
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
  addEntryToPlanner = async (
    planner: Planner,
    plannerEntryReq: PlannerEntryDTORequest
  ): Promise<Planner> => {
    const plannerId = planner.id
    try {
      const entry = await PlannerEntry.create({
        plannerId,
        ...plannerEntryReq,
      })
      await planner.$add('plannerEntry', entry)
      return await this.getPlannerById(plannerId)
    } catch (error) {
      throw error
    }
  }
}
