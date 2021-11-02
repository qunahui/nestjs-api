import {
  Column,
  DataType,
  Table,
  Model,
  TableOptions,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Participant } from './participant.entity'

const tableOptions: TableOptions = {
  tableName: 'messages'
} as TableOptions

@Table(tableOptions)
export class Message extends Model<Message> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Participant)
  participant: Participant;

  @Column({
    type: DataType.STRING,
  })
  content: string;
  
  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}