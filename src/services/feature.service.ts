import { Query } from '../common/types/query.types'
import { FeatureDao } from '../db/DAOs/classes/feature.dao'
import { FeatureDTORequest, FeatureDTOResponse } from '../db/DTOs/feature.dto'
import { FeatureMap } from '../db/mappers/feature.map'

export class FeatureService {
  featureDao: FeatureDao
  constructor() {
    this.featureDao = new FeatureDao()
  }
  getFeatures = async (query: Query): Promise<FeatureDTOResponse[]> => {
    const features = await this.featureDao.getFeatures(query)
    return features.map(m => FeatureMap.toDTO(m))
  }
  getFeatureById = async (id: number): Promise<FeatureDTOResponse> => {
    const feature = await this.featureDao.getFeatureById(id)
    return FeatureMap.toDTO(feature)
  }
  createFeature = async (
    feature: FeatureDTORequest
  ): Promise<FeatureDTOResponse> => {
    const newfeature = await this.featureDao.create(feature)
    return FeatureMap.toDTO(newfeature)
  }
  updateFeature = async (
    id: number,
    feature: FeatureDTORequest
  ): Promise<FeatureDTOResponse> => {
    const updatedfeature = await this.featureDao.update(id, feature)
    return FeatureMap.toDTO(updatedfeature)
  }
  deleteFeature = async (id: number): Promise<string> => {
    const message = await this.featureDao.delete(id)
    return message
  }
}
