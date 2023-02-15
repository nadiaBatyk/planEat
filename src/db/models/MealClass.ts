import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { Ingredient } from "./IngredientClass";
import { Feature } from "./FeatureClass";
import { MealType } from "./MealTypeClass";
import { MealFeature } from "./MealFeatureClass";
import { MealIngredient } from "./MealIngredientClass";
import { sequelize } from "../db";

export class Meal extends Model<
  InferAttributes<Meal>,
  InferCreationAttributes<Meal>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare mealTypeId: ForeignKey<MealType["id"]>;
  declare ingredients?: NonAttribute<Ingredient[]>;
  declare features?: NonAttribute<Feature[]>;

  declare getIngredients: HasManyGetAssociationsMixin<Ingredient>;
  declare addIngredient: HasManyAddAssociationMixin<Ingredient, number>;

  public declare static associations: {
    ingredients: Association<Meal, Ingredient>;
    features: Association<Meal, Feature>;
  };
}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mealTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "MealTypes",
        key: "id",
      },
    },
  },
  { sequelize, timestamps: false }
);

MealType.hasMany(Meal, {
  sourceKey: "id",
  foreignKey: "mealTypeId",
  as: "meals",
});
Meal.belongsTo(MealType, { foreignKey: "mealTypeId" });

Meal.belongsToMany(Feature, { through: MealFeature });
Feature.belongsToMany(Meal, { through: MealFeature });
Meal.belongsToMany(Ingredient, { through: MealIngredient });
Ingredient.belongsToMany(Meal, { through: MealIngredient });
