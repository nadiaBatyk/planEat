import HttpException from '../../../common/error/HttpException'
import { Query } from '../../../common/types/query.types'
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
  getFeatures = async (query: Query): Promise<Feature[]> => {
    try {
      const features = await Feature.findAll({
        where: query.filter,
        order: [[query.orderBy, query.direction]],
        limit: query.pageSize,
        offset: (query.pageNumber - 1) * query.pageSize,
      })
      return features
    } catch (error) {
      throw error
    }
  }

  delete = async (id: number): Promise<string> => {
    try {
      await this.getFeatureById(id)
      await Feature.destroy({
        where: { id: id },
      })
      return `Feature #${id} has been succesfully deleted`
    } catch (error) {
      throw error
    }
  }
  create = async (t: FeatureDTORequest): Promise<Feature> => {
    try {
      const feature = await Feature.create({ ...t })
      return feature
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, feature: FeatureDTORequest): Promise<Feature> => {
    try {
      const currentFeature = await this.getFeatureById(id)
      currentFeature.set(feature)
      await currentFeature.save()
      return currentFeature
    } catch (error) {
      throw error
    }
  }
}
