import { IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  password: string;
}