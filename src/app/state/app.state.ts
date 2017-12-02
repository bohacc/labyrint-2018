import { TeamDto } from '../modules/teams/models/TeamDto';

export const initialState: AppState = {
  teams: {
    list: [],
    registration: {
      name: null
    }
  },
  captcha: {
    status: false
  }
};

export interface AppState {
  teams: {
    list: TeamDto[],
    registration: {
      name: string
    }
  };
  captcha: {
    status: boolean
  };
}
