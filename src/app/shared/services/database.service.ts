import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { UserAuthDto } from '../model/UserAuthDto';
import { LoginTeamDto } from '../model/LoginTeamDto';
import { LoginTeamAction } from '../../state/actions/login-team.actions';
import { TeamDto } from '../../modules/teams/models/TeamDto';
import { ToolsService } from './tools.service';

@Injectable()
export class DatabaseService {
  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>,
    private toolsService: ToolsService
  ) {

  }

  public getNews(): Observable<any> {
    return this.db.list('news').valueChanges();
  }

  public getLoginTeam(userAuth: UserAuthDto) {
    this.db.database.ref('/teams/').once('value')
      .then((snapchot) => {
        console.log('SSSSSSSSSSSSSSSSSSSs');
        const teams: TeamDto[] = this.toolsService.getArray(snapchot.val());
        console.log(teams);
        const loginTeam: LoginTeamDto = teams.filter((team: TeamDto) => {
          return team.email === userAuth.email;
        }).map((team) => {
          delete team.password;
          delete team.password2;
          return team;
        })[0];
        console.log(loginTeam);
        this.store.dispatch(new LoginTeamAction(loginTeam));
      });
  }
}
