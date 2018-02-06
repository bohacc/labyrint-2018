import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../teams.service';
import { State } from '../../state/reducers/module.reducer';
import { Store } from '@ngrx/store';
import { ConfigDbDto } from '../../../../shared/model/ConfigDbDto';
import { TeamDto } from '../../models/TeamDto';
import { AccommodationDto } from '../../../../shared/model/AccommodationDto';
import { AccommodationsService } from '../../services/accommodations.service';

@Component({
  selector: 'teams-page',
  templateUrl: 'teams-page.component.html'
})
export class TeamsPageComponent implements OnInit {
  public config: ConfigDbDto;
  private peopleAccommodationCount: number;
  private teams: TeamDto[];
  public teamsDescription: string;

  constructor(
    private teamsService: TeamsService,
    private store: Store<State>,
    private accommodationsService: AccommodationsService
  ) {
    this.store.select(state => state)
      .subscribe((state) => {
        this.config = state.config.config;
        this.teams  = state.teams.teams.list;
        this.recalculate();
      });
  }

  ngOnInit() {
    this.teamsService.loadTeams();
    this.accommodationsService.loadAccommodations();
  }

  private recalculate() {
    this.peopleAccommodationCount = this.teams.map((team: TeamDto) => {
      const accommodation: AccommodationDto = this.accommodationsService.getAccommodation(team.accommodation);
      return accommodation ? accommodation.count : 0;
    }).reduce((a, b) => a + b, 0);

    if (this.config && this.config.teams_description) {
      this.teamsDescription = this.config.teams_description;
      this.teamsDescription = this.teamsDescription.replace(/@@PEOPLE_COUNT@@/g, this.peopleAccommodationCount + '');
      this.teamsDescription = this.teamsDescription.replace(/@@TEAMS_COUNT@@/g, this.teams.length + '');
      this.teamsDescription = this.teamsDescription.replace(/@@TEAMS_LIMIT@@/g, this.config.teams_limit + '');
    }
  }
}
