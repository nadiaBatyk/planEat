import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../db";
import { Feature } from "./FeatureClass";
import { Meal } from "./MealClass";

export class MealFeature extends Model<
  InferAttributes<MealFeature>,
  InferCreationAttributes<MealFeature>
> {
  declare mealId: ForeignKey<Meal["id"]>;
  declare featureId: ForeignKey<Feature["id"]>;
  declare value: string;
}
MealFeature.init(
  {
    mealId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "mealId",
      references: {
        model: "Meals",
        key: "id",
      },
    },
    featureId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "featureId",
      references: {
        model: "Features",
        key: "id",
      },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);
