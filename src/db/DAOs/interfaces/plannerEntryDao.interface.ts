import { PlannerEntry } from '../../models/PlannerEntry'
import { BaseDao } from './baseDao.interface'

export interface IPlannerEntryDao extends BaseDao<PlannerEntry> {
  getPlannerEntryById(id: number): Promise<PlannerEntry>
  getPlannerEntries(): Promise<PlannerEntry[]>
}
