import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript'
import { Meal } from './Meal'
import { MealFeature } from './MealFeature'

@Table({ timestamps: false })
export class Feature extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column(DataTypes.STRING(80))
  name!: string

  @BelongsToMany(() => Meal, () => MealFeature)
  meals!: Meal[]
}
