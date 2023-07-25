import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { Planner } from './Planner'
import { MealTime } from './MealTime'

@Table({ timestamps: false })
export class PlannerEntry extends Model {
  @ForeignKey(() => Planner)
  @Column
  plannerId!: number

  @ForeignKey(() => Meal)
  @Column
  mealId!: number

  @ForeignKey(() => MealTime)
  @Column
  mealTimeId!: number

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  mealDate!: Date

  @BelongsTo(() => Planner)
  planner!: Planner

  @BelongsTo(() => Meal)
  meal!: Meal

  @BelongsTo(() => MealTime)
  mealTime!: MealTime
}
