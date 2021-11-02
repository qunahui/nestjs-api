import * as bcrypt from 'bcrypt';
import {  Injectable, NotFoundException, Inject } from '@nestjs/common';
import { RegisterDto } from '../users/dto/register.dto'
import { USER_NOT_FOUND, USER_REPOSITORY, USER_ROLE_REPOSITORY } from 'src/core/constants'
import { User } from './entities/user.entity'
import { UserRole } from './entities/user-role.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

import { Op } from 'sequelize'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: typeof User,
    @Inject(USER_ROLE_REPOSITORY)
    private readonly userRoleRepository: typeof UserRole,
  ) {}

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async signUp(registerDto: RegisterDto): Promise<User> {
    registerDto.password = await this.hashPassword(registerDto.password);
    const user = await this.userRepository.create<User>(registerDto);

    return user;
  }
  
  async findByEmailOrPhoneNumber(userCredential: string): Promise<User> {
    const user = await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [{ email: userCredential }, { phone: userCredential }],
      },
    })

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOne<User>({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const roles = await this.userRoleRepository.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: Role,
        }
      ],
    })

    delete user['dataValues'].password;
    user['dataValues'].roles = [];
    roles.map((role) => {
      user['dataValues'].roles.push(role.role);
    });

    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }
}
