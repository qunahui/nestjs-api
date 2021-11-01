import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesProviders } from './roles.provider';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...RolesProviders],
  exports: [RolesService],
})
export class RolesModule {}
