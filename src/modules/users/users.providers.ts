import {
  USER_REPOSITORY,
} from 'src/core/constants';
import { User } from './entities/user.entity';

export const UsersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
]