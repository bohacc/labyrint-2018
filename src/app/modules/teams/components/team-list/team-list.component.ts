import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../../teams.service';
import { AppState } from '../../../../state/app.state';
import { Store } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { InitCaptchaAction } from '../../../captcha/state/actions/captcha.actions';
import { State } from '../../state/reducers/module.reducer';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamListComponent implements OnInit {
  public teams: Observable<TeamDto[]>;

  constructor(
    private teamsService: TeamsService,
    private store: Store<State>
  ) {
    // subscribe teams from store
    this.teams = this.store.select(state => {
      return state.teams.teams.list;
    });
  }

  ngOnInit() {
    this.store.dispatch(new InitCaptchaAction(false));
  }

  public removeTeam(team: TeamDto) {
    this.teamsService.deleteItem(team);
  }
}
