import { Action } from '@ngrx/store';
import { MessageDto } from '../../shared/model/messageDto';

export const NEW_MESSAGE = '[NEW_MESSAGE] - new message';

export type MessagesActions = MessageAction;

export class MessageAction implements Action {
  readonly type = NEW_MESSAGE;
  constructor(public payload: MessageDto[]) {}
}
