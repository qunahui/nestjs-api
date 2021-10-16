import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProviders } from './users.providers';
@Module({
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
