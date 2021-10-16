import { 
  Model, 
  Column,
  DataType,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  TableOptions
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'users',
} as TableOptions;

export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  })
  public email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public displayName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true, 
    }
  })
  public phone: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}


