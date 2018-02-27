import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../../teams.service';
import { AppState } from '../../../../state/app.state';
import { Store } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { InitCaptchaAction } from '../../../captcha/state/actions/captcha.actions';
import { State } from '../../state/reducers/module.reducer';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.component.html',
  styleUrls: ['team-list.component.scss'],
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class TeamListComponent implements OnInit {
  public teams: TeamDto[];
  public config: ConfigDbDto;

  constructor(
    private teamsService: TeamsService,
    private store: Store<State>
  ) {
    // subscribe teams from store
    this.store.select(state => state)
      .subscribe((state) => {
        this.teams = state.teams.teams.list;
        this.config = state.config.config;
      });
  }

  ngOnInit() {
    this.teamsService.loadTeams();
  }

  public removeTeam(team: TeamDto) {
    this.teamsService.deleteItem(team);
  }
}
