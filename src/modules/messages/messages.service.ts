import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PARTICIPANT_REPOSITORY, ROOM_REPOSITORY } from 'src/core/constants';
import { JoinRoomDto } from './dto/join-room.dto';
import { MessageDto } from './dto/message.dto';
import { PaginationQueryDto } from './dto/paginator.dto';
import { Participant } from './entities/participant.entity';
import { Room } from './entities/room.entity';
import { MessagesGateway } from './messages.gateway';


@Injectable()
export class MessagesService {
  constructor(
    @Inject(ROOM_REPOSITORY) 
    private readonly roomRepository: typeof Room,
    @Inject(PARTICIPANT_REPOSITORY) 
    private readonly participantRepository: typeof Participant,
    private jwtService: JwtService,
    private readonly messageGateway: MessagesGateway,
  ) {}

  async joinRoom(joinRoomDto: JoinRoomDto) {
    try {
      const isUsernameJoinedChatroom = await this.checkUsernameJoinedChatroom(
        joinRoomDto.username,
        joinRoomDto.roomId,
      )

      if(isUsernameJoinedChatroom) {
        throw new BadRequestException('Username already joined chatroom!');
      }

      // find room
      let room = await this.roomRepository.findOne({
        where: {
          id: joinRoomDto.roomId,
        }
      })

      if (!room) {
        room = await this.roomRepository.create<Room>({
          id: joinRoomDto.roomId,
        } as Room)
      }

      let participant = await this.participantRepository.findOne({
        where: {
          username: joinRoomDto.username,
          roomId: joinRoomDto.roomId,
        }
      });

      if (!participant) {
        participant = new this.participantRepository({
          username: joinRoomDto.username,
          roomId: joinRoomDto.roomId,
        } as Participant);
      }

      const jwtToken = this.jwtService.sign(
        {
          username: joinRoomDto.username,
          roomId: joinRoomDto.roomId,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      );
      participant.token = jwtToken;
      await participant.save();

      room.onlineParticipants.push(participant);
      await room.save();

      this.messageGateway.server.emit(`join_room_${joinRoomDto.roomId}`, {
        participant,
      });

      return participant;
    } catch (e) {
      console.log(e.message)
    }
  }

  async leaveRoom(username: string, roomId: string) {
  //   const room = await this.roomRepository.findOne({
  //     roomId,
  //   });
  //   const participantIndex = room.onlineParticipants.findIndex(
  //     (participant) => participant.username === username,
  //   );
  //   if (participantIndex > -1) {
  //     room.onlineParticipants.splice(participantIndex, 1);
  //     room.markModified('onlineParticipants');
  //     await room.save();
  //   }
  //   await this.participantRepository.findOneAndUpdate(
  //     {
  //       username,
  //       roomId,
  //     },
  //     {
  //       token: null,
  //     },
  //   );
  //   this.messageGateway.server.emit(`leave_room_${roomId}`, {
  //     username,
  //   });
  //   return;
  }

  async sendMessage(username: string, roomId: string, message: MessageDto) {
  //   const session = await this.roomRepository.startSession();
  //   session.startTransaction();
  //   try {
  //     const participant = await this.participantRepository.findOne({
  //       username,
  //     });
  //     const newMessage = new this.messageModel({
  //       participant,
  //       content: message.content,
  //     });
  //     const room = await this.roomRepository.findOne({
  //       roomId,
  //     });
  //     room.messages.push(newMessage);
  //     room.markModified('messages');
  //     await newMessage.save({
  //       session,
  //     });
  //     await room.save({
  //       session,
  //     });

  //     this.messageGateway.server.emit(`receive_message_${roomId}`, {
  //       username,
  //       message: newMessage,
  //     });

  //     await session.commitTransaction();
  //     session.endSession();

  //     return newMessage;
  //   } catch (error) {
  //     await session.abortTransaction();
  //     session.endSession();
  //     throw error;
  //   }
  }

  async checkUsernameJoinedChatroom(username: string, roomId: number) {
    const participant = await this.participantRepository.findOne({
      where: {
        roomId,
        username,
      }
    });
    return !!participant?.token;
  }

  async getRoomMessages(roomId: string, paginationQuery: PaginationQueryDto) {
    // const offset = +paginationQuery?.offset || 0;
    // const limit = +paginationQuery?.limit || 15;

    // const room = await this.roomRepository
    //   .findOne(
    //     {
    //       roomId,
    //     },
    //     {
    //       messages: { $slice: [offset, limit] },
    //     },
    //   )
    //   .sort({
    //     'messages.createdAt': 1,
    //   })
    //   .populate({
    //     path: 'messages',
    //     populate: {
    //       path: 'participant',
    //       select: 'username',
    //     },
    //   });
    // return room;
  }
}
