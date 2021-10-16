import { 
  BadRequestException, 
  Body, 
  ConflictException, 
  Controller, 
  Get, 
  Post, 
  Request, 
  UseGuards, 
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/core/decorators/auth.decorator';
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from '../users/dto/register.dto';
import { DoesUserExistGuard } from '../users/guards/does-user-exist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @Post('/sign-up')
  @UseGuards(DoesUserExistGuard)
  async signUp(
    @Body(ValidationPipe) registerDto: RegisterDto
  ): Promise<any> {
    try {
      return await this.authService.signUp(registerDto);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))

      if (error?.errors && error?.errors[0].type === 'unique violation') {
        throw new ConflictException('Phone or email already taken !')
      } else {
        throw new BadRequestException(error.errors[0].message);
      }
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() req): Promise<any> {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Get('/logout')
  async logout(@Request() req) {
    return await this.authService.logout(req);
  }
}
