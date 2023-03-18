import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'
import { PlannerEntry } from './PlannerEntry'

@Table({ timestamps: false })
export class Planner extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @AllowNull(false)
  @Column(DataTypes.DATE)
  startDate!: Date

  @AllowNull(false)
  @Column(DataTypes.DATE)
  finishDate!: Date

  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  active!: boolean

  @HasMany(() => PlannerEntry)
  plannerEntries!: PlannerEntry[]
}
