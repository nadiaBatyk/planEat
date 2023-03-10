import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'
import { Meal } from './Meal'
import { PlannerEntry } from './PlannerEntry'

@Table({ timestamps: false })
export class MealType extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @HasMany(() => Meal)
  meals!: Meal[]

  @HasMany(() => PlannerEntry)
  plannerEntries!: PlannerEntry[]
}
