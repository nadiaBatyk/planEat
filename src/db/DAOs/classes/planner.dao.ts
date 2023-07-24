import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
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
  getPlanners = async (query: Query): Promise<Planner[]> => {
    try {
      const planner = await Planner.findAll({
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })

      return planner
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      await this.getPlannerById(id)
      await Planner.destroy({
        where: { id: id },
      })
      return `Planner #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (newPlanner: PlannerDTORequest): Promise<Planner> => {
    try {
      const planner = await Planner.create({ ...newPlanner })
      return planner
    } catch (error) {
      throw error
    }
  }
  update = async (
    id: number,
    newPlanner: PlannerDTORequest
  ): Promise<Planner> => {
    try {
      const planner = await this.getPlannerById(id)
      planner.set(newPlanner)
      await planner.save()
      return planner
    } catch (error) {
      throw error
    }
  }
}
