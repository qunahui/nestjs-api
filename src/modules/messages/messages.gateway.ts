import { Inject, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PARTICIPANT_REPOSITORY, ROOM_REPOSITORY } from 'src/core/constants';
import { Participant } from './entities/participant.entity';
import { Room } from './entities/room.entity';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    @Inject(ROOM_REPOSITORY) 
    private readonly roomRepository: typeof Room,
    @Inject(PARTICIPANT_REPOSITORY) 
    private readonly participantRepository: typeof Participant,
  ) {}

  users = {};

  afterInit(server: Server) {
    this.logger.log('Init AppGateway');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const { username, roomId } = this.users[client.id];
    if (username && roomId) {
      const room = await this.roomRepository
        .findOne({
          where: {
            id: roomId,
          }
        });
      const participantIndex = room.onlineParticipants?.findIndex(
        (participant) => participant.username === username,
      );
      if (participantIndex > -1) {
        room.onlineParticipants.splice(participantIndex, 1);
        // room.markModified('onlineParticipants');
        await room.save();
      }
      // await this.participantModel.findOneAndUpdate(
      //   {
      //     username,
      //     roomId,
      //   },
      //   {
      //     token: null,
      //   },
      // );
    }
    this.server.emit(`leave_room_${roomId}`, {
      username,
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.users[client.id] = {};
  }

  @SubscribeMessage('identity')
  async onChat(client, message) {
    this.logger.log(
      `Client connected: ${message.username} at room ${message.roomId}`,
    );
    this.users[client.id] = {
      username: message.username,
      roomId: message.roomId,
    };
  }
}
