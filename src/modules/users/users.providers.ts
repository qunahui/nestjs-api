import {
  USER_REPOSITORY,
  USER_ROLE_REPOSITORY,
} from 'src/core/constants';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';

export const UsersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: USER_ROLE_REPOSITORY,
    useValue: UserRole,
  },
]