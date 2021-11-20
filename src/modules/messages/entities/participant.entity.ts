import {
  Column,
  DataType,
  Table,
  Model,
  TableOptions,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { Room } from './room.entity';

const tableOptions: TableOptions = {
  tableName: 'participants'
} as TableOptions

@Table(tableOptions)
export class Participant extends Model<Participant> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Room)
  roomId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;
  
  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}