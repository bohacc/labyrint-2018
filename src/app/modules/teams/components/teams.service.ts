import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as Actions from '../../../state/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadTeamsAction, TeamsActions } from '../state/actions/teams.actions';
import { TeamDto } from '../models/TeamDto';

@Injectable()
export class TeamsService {
  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) { }

  public teamsToStore() {
    this.db.list('/teams')
      .valueChanges()
      .subscribe(
        (teams: TeamDto[]) => {
          this.store.dispatch(new LoadTeamsAction(teams || []));
        },
        () => {}
      );
  }

  public getTeams() {
    return this.db.list('/teams');
  }
}
