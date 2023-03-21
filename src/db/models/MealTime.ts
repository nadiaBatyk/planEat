import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'
import { PlannerEntry } from './PlannerEntry'

@Table({ timestamps: false })
export class MealTime extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @HasMany(() => PlannerEntry)
  plannerEntries!: PlannerEntry[]
}
