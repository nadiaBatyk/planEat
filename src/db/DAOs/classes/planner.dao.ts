import HttpException from '../../../common/error/HttpException'
import { PlannerDTORequest } from '../../DTOs/planner.dto'
import { Planner } from '../../models/Planner'
import { IPlannerDao } from '../interfaces/plannerDao.interface'

export class PlannerDao implements IPlannerDao {
  getPlannerById = async (id: number): Promise<Planner> => {
    try {
      const planner = await Planner.findByPk(id)

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
        order: [['id', 'ASC']],
      })
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
}
