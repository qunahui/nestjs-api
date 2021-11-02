import {
  PARTICIPANT_REPOSITORY,
  MESSAGE_REPOSITORY,
  ROOM_REPOSITORY,
} from 'src/core/constants';
import { Room } from './entities/room.entity'
import { Participant } from './entities/participant.entity'
import { Message } from './entities/message.entity'

export const MessagesProviders = [
  {
    provide: PARTICIPANT_REPOSITORY,
    useValue: Participant,
  },
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
  {
    provide: ROOM_REPOSITORY,
    useValue: Room,
  },
]