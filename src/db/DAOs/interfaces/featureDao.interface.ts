import { Query } from '../../../common/types/query.types'
import { Feature } from '../../models/Feature'
import { BaseDao } from './baseDao.interface'

export interface IFeatureDao extends BaseDao<Feature> {
  getFeatureById(id: number): Promise<Feature>
  getFeatures(query: Query): Promise<Feature[]>
}
