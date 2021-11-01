import {
  IsNotEmpty,
} from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateRoleDto extends Role {
  @IsNotEmpty({
    message: 'Name should not be empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'Code should not be empty',
  })
  code: string;
}