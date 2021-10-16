import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './core/guards'
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
      ttl: 48 * 60 * 60,
      isGlobal: true,
    }),
    AuthModule, 
    UsersModule, 
    DatabaseModule,
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
