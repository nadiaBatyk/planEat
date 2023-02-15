import { sequelize } from "../db";
import { DataTypes } from "sequelize";

export const MealType = sequelize.define(
  "MealType",
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
  },
  { timestamps: false }
);
