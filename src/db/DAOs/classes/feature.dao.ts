import HttpException from '../../../common/error/HttpException'
import { FeatureDTORequest } from '../../DTOs/feature.dto'
import { Feature } from '../../models/Feature'
import { IFeatureDao } from '../interfaces/featureDao.interface'

export class FeatureDao implements IFeatureDao {
  getFeatureById = async (id: number): Promise<Feature> => {
    try {
      const planner = await Feature.findByPk(id)

      if (planner) {
        return planner
      }
      throw new HttpException(
        404,
        `Feature with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  getFeatures = async (): Promise<Feature[]> => {
    try {
      const planners = await Feature.findAll({
        order: [['id', 'ASC']],
      })
      return planners
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      const rowNumber = await Feature.destroy({
        where: { id: id },
      })
      if (rowNumber) {
        return `Feature #${id} has been succesfully deleted`
      }
      throw new HttpException(
        404,
        `Feature with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
  create = async (t: FeatureDTORequest): Promise<Feature> => {
    try {
      const planner = await Feature.create({ ...t })
      return planner.dataValues
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: FeatureDTORequest): Promise<Feature> => {
    try {
      const planner = await Feature.findByPk(id)
      if (planner) {
        planner.set(m)
        await planner.save()
        return planner.dataValues
      }

      throw new HttpException(
        404,
        `Feature with id ${id} does not exist`,
        'Not Found'
      )
    } catch (error) {
      throw error
    }
  }
}
