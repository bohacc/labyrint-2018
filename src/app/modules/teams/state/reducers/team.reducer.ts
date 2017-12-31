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
    firstName: null,
    firstName2: null,
    firstName3: null,
    firstName4: null,
    firstName5: null,
    food: null,
    food2: null,
    food3: null,
    food4: null,
    food5: null,
    lastName: null,
    lastName2: null,
    lastName3: null,
    lastName4: null,
    lastName5: null,
    name: null,
    password: null,
    password2: null,
    payId: null,
    phone: null,
    tshirt: null,
    tshirt2: null,
    tshirt3: null,
    tshirt4: null,
    tshirt5: null
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
