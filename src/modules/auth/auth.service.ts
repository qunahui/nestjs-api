import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { RegisterDto } from '../users/dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailOrPhoneNumber(username);
    
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      const { password, ...result } = user['dataValues'];
      return result;
    }

    return null;
  }

  async signIn(user: AuthCredentialsDto): Promise<any> {
    const token = await this.generateToken(user);
    return { token };
  }

  async signUp(registerDto: RegisterDto): Promise<any> {
    const newUser = await this.usersService.signUp(registerDto);
    const { password, ...result } = newUser['dataValues']
    const token = await this.generateToken(result);

    return { user: newUser, token }
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    await this.cacheManager.set(token, 1);
    return token;
  }

  async logout(req) {
    if (req?.headers?.authorization) {
      const token = req?.headers?.authorization?.replace('Bearer ', '');
      await this.cacheManager.del(token);
    }
    return { message: 'Removed token' };
  }
}
