import { FeatureDao } from '../db/DAOs/classes/feature.dao'
import { FeatureDTO } from '../db/DTOs/feature.dto'
import { FeatureMap } from '../db/mappers/feature.map'

export class FeatureService {
  featureDao: FeatureDao
  constructor() {
    this.featureDao = new FeatureDao()
  }
  getFeatures = async (): Promise<FeatureDTO[]> => {
    const features = await this.featureDao.getFeatures()
    return features.map(m => FeatureMap.toDTO(m))
  }
  getFeatureById = async (id: number): Promise<FeatureDTO> => {
    const feature = await this.featureDao.getFeatureById(id)
    return FeatureMap.toDTO(feature)
  }
  createFeature = async (feature: FeatureDTO): Promise<FeatureDTO> => {
    const newfeature = await this.featureDao.create(feature)
    return FeatureMap.toDTO(newfeature)
  }
  updateFeature = async (
    id: number,
    feature: FeatureDTO
  ): Promise<FeatureDTO> => {
    const updatedfeature = await this.featureDao.update(id, feature)
    return FeatureMap.toDTO(updatedfeature)
  }
  deleteFeature = async (id: number): Promise<string> => {
    const message = await this.featureDao.delete(id)
    return message
  }
}
