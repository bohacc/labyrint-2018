import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../teams.service';
import { AppState } from '../../../../state/app.state';
import { Store } from '@ngrx/store';
import { TeamDto } from '../../models/TeamDto';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.component.html',
  styles: []
})
export class TeamListComponent implements OnInit {
  public teams: Observable<TeamDto[]>;

  constructor(
    private teamsService: TeamsService,
    private store: Store<AppState>
  ) {
    // subscribe teams from store
    this.teams = this.store.select(state => state.teams);
  }

  ngOnInit() {
    // load teams and save to store
    this.teamsService.teamsToStore();
  }

  removeTeam() {
    // this.store.dispatch(new Actions.Search(query)))
  }
}
