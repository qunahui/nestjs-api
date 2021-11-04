import {
  Column,
  DataType,
  Table,
  Model,
  TableOptions,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Participant } from './participant.entity'
import { Message } from './message.entity'

const tableOptions: TableOptions = {
  tableName: 'rooms'
} as TableOptions

@Table(tableOptions)
export class Room extends Model<Room> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @HasMany(() => Participant)
  onlineParticipants?: Participant[];
  
  @HasMany(() => Participant)
  messages?: Message[];
  
  @CreatedAt public createdAt?: Date;

  @UpdatedAt public updatedAt?: Date;
}