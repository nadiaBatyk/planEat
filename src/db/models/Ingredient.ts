import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { Meal } from './Meal';
import { MealIngredient } from './MealIngredient';

@Table({ timestamps: false })
export class Ingredient extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  unit!: string;

  @BelongsToMany(() => Meal, () => MealIngredient)
  meals!: Meal[];
}
