import { Query } from '../../../common/types/query.types'
import { Planner } from '../../models/Planner'
import { BaseDao } from './baseDao.interface'

export interface IPlannerDao extends BaseDao<Planner> {
  getPlannerById(id: number): Promise<Planner>
  getPlanners(query: Query): Promise<Planner[]>
}
