import { DataTypes } from 'sequelize'
import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'
import { PlannerMeal } from './PlannerMeal'

@Table({ timestamps: false })
export class Planner extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  startDate!: Date

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  finishDate!: Date

  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  active!: boolean

  @HasMany(() => PlannerMeal)
  plannerMeals!: PlannerMeal[]
}
