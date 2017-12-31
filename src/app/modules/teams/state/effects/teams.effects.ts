import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Actions, Effect } from '@ngrx/effects';
import { TeamsService } from '../../teams.service';
import * as UserAuthActions from '../../../../state/actions/userAuth.actions';
import * as TeamsActions from '../actions/teams.actions';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamsEffects {
  @Effect() auth$: Observable<Action> =
    this.actions$.ofType(UserAuthActions.AUTH_USER)
      .map((user) => {
        console.log('ZZZZZZZZZZZZZZZZ');
        console.log(user);
        return null;
      });
    /*.switchMap((user: any) => {
      console.log(user);
      return this.teamsService.loadTeam(user.uid)
        .map(team => new TeamsActions.LoadTeamAction(team))
        .catch(() => of(new TeamsActions.LoadTeamAction(null)));
    });*/

  constructor(
    private actions$: Actions,
    private teamsService: TeamsService
  ) { }
}
