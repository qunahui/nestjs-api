import { ROLE_REPOSITORY } from 'src/core/constants';
import { Role } from './entities/role.entity';

export const RolesProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];
