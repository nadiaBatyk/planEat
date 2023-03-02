import HttpException from '../../../common/error/HttpException'
import { FeatureDTO } from '../../DTOs/feature.dto'
import { Feature } from '../../models/Feature'
import { IFeatureDao } from '../interfaces/featureDao.interface'

export class FeatureDao implements IFeatureDao {
  getFeatureById = async (id: number): Promise<Feature> => {
    try {
      const mealType = await Feature.findByPk(id)

      if (mealType) {
        return mealType?.dataValues
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
      const mealTypes = await Feature.findAll({
        order: [['id', 'ASC']],
      })
      return mealTypes
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
        return `MealType #${id} has been succesfully deleted`
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
  create = async (t: FeatureDTO): Promise<Feature> => {
    try {
      const mealType = await Feature.create({ ...t })
      return mealType.dataValues
    } catch (error) {
      throw error
    }
  }
  update = async (id: number, m: FeatureDTO): Promise<Feature> => {
    try {
      const mealType = await Feature.findByPk(id)
      if (mealType) {
        mealType.set(m)
        await mealType.save()
        return mealType.dataValues
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
