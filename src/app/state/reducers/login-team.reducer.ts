import { LoginTeamDto } from '../../shared/model/LoginTeamDto';
import * as LoginTeamActions from '../actions/login-team.actions';

export interface State {
  team: LoginTeamDto;
}

export const initialState: State = {
  team: {
    key: null,
    accommodation: null,
    email: null,
    name: null,
    phone: null,
    payId: null,
    payAmount: null,
    payAccount: null,
    player1: {
      firstName: null,
      lastName: null,
      food: null,
      tshirt: null,
    },
    player2: {
      firstName: null,
      lastName: null,
      food: null,
      tshirt: null,
    },
    player3: {
      firstName: null,
      lastName: null,
      food: null,
      tshirt: null,
    },
    player4: {
      firstName: null,
      lastName: null,
      food: null,
      tshirt: null,
    },
    player5: {firstName: null,
      lastName: null,
      food: null,
      tshirt: null,
    },
    accommodationPrice: null,
    tshirtsPrice: null,
    registrationDate: null
  }
};

export function loginTeamReducer(state = initialState, action: LoginTeamActions.LoginTeamActions) {
  switch (action.type) {
    case LoginTeamActions.LOGIN_TEAM:
      return {
        ...state,
        team: action.payload
      };
    default:
      return state;
  }
}
