import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { Meal } from "./MealClass";
import { sequelize } from "../db";

export class Ingredient extends Model<
  InferAttributes<Ingredient>,
  InferCreationAttributes<Ingredient>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare unit: string;
  declare meals?: NonAttribute<Meal[]>;

  public declare static associations: {
    meals: Association<Ingredient, Meal>;
  };
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    unit: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);
