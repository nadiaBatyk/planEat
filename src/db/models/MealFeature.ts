import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Meal } from './Meal';
import { Feature } from './Feature';

@Table({ timestamps: false })
export class MealFeature extends Model {
  @ForeignKey(() => Meal)
  @Column
  mealId!: number;

  @ForeignKey(() => Feature)
  @Column
  featureId!: number;

  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  value!: string;
}
