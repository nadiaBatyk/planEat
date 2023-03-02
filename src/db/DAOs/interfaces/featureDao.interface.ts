import { Feature } from '../../models/Feature'
import { BaseDao } from './baseDao.interface'

export interface IFeatureDao extends BaseDao<Feature> {
  getFeatureById(id: number): Promise<Feature>
  getFeatures(): Promise<Feature[]>
}
