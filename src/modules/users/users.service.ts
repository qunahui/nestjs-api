import * as bcrypt from 'bcrypt';
import { BadRequestException, ConflictException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { RegisterDto } from '../users/dto/register.dto'
import { USER_NOT_FOUND, USER_REPOSITORY } from 'src/core/constants'
import { User } from './entities/user.entity'
import { Op } from 'sequelize'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: typeof User,
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
}
