import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript'
import { Meal } from './Meal'
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

  @BelongsToMany(() => Meal, () => PlannerMeal)
  meals!: Meal[]
}
