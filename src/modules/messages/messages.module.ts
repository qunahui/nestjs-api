import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { MessagesGateway } from './messages.gateway'
import { MessagesProviders } from './messages.provider'

@Module({
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService, ...MessagesProviders],
})
export class MessagesModule {}
