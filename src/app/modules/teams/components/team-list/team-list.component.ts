import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../../teams.service';
import { AppState } from '../../../../state/app.state';
import { Store } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';
import { InitCaptchaAction } from '../../../captcha/state/actions/captcha.actions';
import { State } from '../../state/reducers/module.reducer';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.component.html',
  styleUrls: ['team-list.component.scss'],
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class TeamListComponent implements OnInit, OnDestroy {
  public teams: TeamDto[];
  public config: ConfigDbDto;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private teamsService: TeamsService,
    private store: Store<State>
  ) {
    // subscribe teams from store
    this.store.select(state => state)
      .takeUntil(this.unsubscribe)
      .subscribe((state) => {
        this.teams = state.teams.teams.list;
        this.config = state.config.config;
      });
  }

  ngOnInit() {
    this.teamsService.loadTeams();
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public removeTeam(team: TeamDto) {
    this.teamsService.deleteItem(team);
  }
}
