import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

import {
  Column,
  Table,
  Model,
  TableOptions,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'user_roles'
} as TableOptions

@Table(tableOptions)
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Role)
  role: Role;
}