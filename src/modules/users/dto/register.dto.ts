import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class RegisterDto extends User {
  @IsNotEmpty({
    message: 'Firstname should not be empty',
  })
  readonly displayName: string;

  @IsNotEmpty({
    message: 'Email should not be empty',
  })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({
    message: 'Password should not be empty',
  })
  @MinLength(6)
  password: string;

  @IsNotEmpty({
    message: 'Phone number should not be empty',
  })
  readonly phone: string;
}