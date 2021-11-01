import { User } from 'src/modules/users/entities/user.entity';
import { UserRole } from 'src/modules/users/entities/user-role.entity'
import {
  Column,
  DataType,
  Table,
  Model,
  TableOptions,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'roles'
} as TableOptions

@Table(tableOptions)
export class Role extends Model<Role> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  code: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
  
  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}