import { MessageDto } from '../../shared/model/messageDto';
import * as MessagesActions from '../actions/messages.actions';

export interface State {
  messages: MessageDto[];
}

export const initialState: State = {
  messages: []
};

export function messagesReducer(state = initialState, action: MessagesActions.MessageAction) {
  switch (action.type) {
    case MessagesActions.NEW_MESSAGE:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}
