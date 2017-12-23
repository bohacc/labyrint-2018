import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../teams.service';

@Component({
  selector: 'teams-page',
  templateUrl: 'teams-page.component.html'
})
export class TeamsPageComponent implements OnInit {
  constructor(private teamsService: TeamsService) {}

  ngOnInit() {
    this.teamsService.loadTeams();
  }
}
