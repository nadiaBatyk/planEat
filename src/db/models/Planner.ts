import { DataTypes } from 'sequelize'
import {
  Table,
  Column,
  Model,
  AllowNull,
  HasMany,
  IsDate,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { PlannerEntry } from './PlannerEntry'
import { User } from './User'

@Table({ timestamps: false })
export class Planner extends Model {
  @AllowNull(false)
  @Column(DataTypes.STRING(100))
  name!: string

  @AllowNull(false)
  @IsDate
  @Column(DataTypes.DATEONLY)
  startDate!: Date

  @AllowNull(false)
  @IsDate
  @Column(DataTypes.DATEONLY)
  finishDate!: Date

  @ForeignKey(() => User)
  @Column
  userId!: number

  @HasMany(() => PlannerEntry)
  plannerEntries!: PlannerEntry[]

  @BelongsTo(() => User)
  user!: User
}
