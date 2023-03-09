import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { Planner } from './Planner'
import { MealType } from './MealType'

@Table({ timestamps: false })
export class PlannerMeal extends Model {
  @ForeignKey(() => Planner)
  @Column
  plannerId!: number

  @ForeignKey(() => Meal)
  @Column
  mealId!: number

  @ForeignKey(() => MealType)
  @Column
  mealTypeId!: number

  @AllowNull(false)
  @Column(DataTypes.DATEONLY)
  mealDate!: Date
}
