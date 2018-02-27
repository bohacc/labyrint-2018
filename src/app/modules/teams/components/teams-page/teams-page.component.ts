import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../teams.service';
import { State } from '../../state/reducers/module.reducer';
import { Store } from '@ngrx/store';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';

@Component({
  selector: 'teams-page',
  templateUrl: 'teams-page.component.html'
})
export class TeamsPageComponent implements OnInit {
  public config: ConfigDbDto;

  constructor(
    private teamsService: TeamsService,
    private store: Store<State>
  ) {
    this.store.select(state => state)
      .subscribe((state) => {
        this.config = state.config.config;
      });
  }

  ngOnInit() {
    this.teamsService.loadTeams();
  }
}
