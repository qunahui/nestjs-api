import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
      ttl: 48 * 60 * 60,
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [JwtModule]
})

export class CoreModule {}