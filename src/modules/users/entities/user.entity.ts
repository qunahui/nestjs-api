import { 
  Model, 
  Column,
  DataType,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  TableOptions,
  Table,
  BelongsToMany
} from 'sequelize-typescript';
import { Role } from 'src/modules/roles/entities/role.entity';
import { UserRole } from './user-role.entity';

const tableOptions: TableOptions = {
  tableName: 'users',
} as TableOptions;

@Table(tableOptions)
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

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}


