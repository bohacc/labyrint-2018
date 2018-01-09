import { TeamDto } from '../../models/TeamDto';
import * as TeamsActions from '../actions/teams.actions';
import { ErrorDto } from '../../../../shared/model/ErrorDto';

export interface State {
  list: TeamDto[];
  registration: {
    name: string
  };
  errors: ErrorDto[];
  registrationFormSuccess: boolean;
  team: TeamDto;
}

export const initialState: State = {
  list: [],
  registration: {
    name: null
  },
  errors: [],
  registrationFormSuccess: null,
  team: {
    accommodation: null,
    email: null,
    name: null,
    password: null,
    password2: null,
    payId: null,
    paySent: null,
    phone: null,
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
    }
  }
};

export function teamsReducer(state = initialState, action: TeamsActions.TeamsActions) {
  switch (action.type) {
    case TeamsActions.LOAD_TEAMS:
      return {
        ...state,
        list: [...action.payload]
      };
    case TeamsActions.REMOVE_TEAM:
      return {
        ...state,
        list: state.list.filter((team) => team.name !== action.payload.name )
      };
    case TeamsActions.CREATE_TEAM:
      return state;
    case TeamsActions.UPDATE_TEAM:
      return {
        ...state,
        list: [...state.list.filter((team) => team.name !== action.payload.name), action.payload]
      };
    case TeamsActions.REGISTER_EXISTS_TEAM:
      return {
        ...state,
        errors: [action.payload]
      };
    case TeamsActions.REGISTRATION_FORM_SUCCESS_TEAM:
      return {
        ...state,
        registrationFormSuccess: action.payload
      };
    case TeamsActions.LOAD_TEAM:
      return {
        ...state,
        team: action.payload
      };
    default:
      return state;
  }
}
