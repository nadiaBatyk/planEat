import { Planner } from '../../models/Planner'
import { BaseDao } from './baseDao.interface'

export interface IPlannerDao extends BaseDao<Planner> {
  getPlannerById(id: number): Promise<Planner>
  getPlanners(): Promise<Planner[]>
}
