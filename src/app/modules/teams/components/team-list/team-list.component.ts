import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'courses-list',
  templateUrl: 'courses-list.component.html',
  styles: []
})
export class TeamListComponent implements OnInit {
  teamsObservable: Observable<any[]>;

  constructor(
    private teamsService: TeamsService
  ) {
    // subscribe teams from store
  }

  ngOnInit() {
    this.teamsObservable = this.teamsService.getTeams();
  }
}
