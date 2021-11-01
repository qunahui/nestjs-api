import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from 'src/core/constants';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@Inject(ROLE_REPOSITORY) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create<Role>(createRoleDto);
  }

  async getAll() {
    const items = await this.roleRepository.findAndCountAll<Role>()

    return {
      data: items.rows,
      meta: {
        total: items.count,
      }
    }
  }
}
