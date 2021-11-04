import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './core/database/database.module';
import { RolesModule } from './modules/roles/roles.module';
import { MessagesModule } from './modules/messages/messages.module'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './core/guards'
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [
    CoreModule,
    AuthModule, 
    UsersModule, 
    DatabaseModule, 
    RolesModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
