import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class JoinRoomDto {
  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  readonly roomId: number;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  readonly username: string;
}
