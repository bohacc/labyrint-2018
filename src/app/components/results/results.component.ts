import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public content = '';

  constructor(
    private databaseService: DatabaseService,
  ) {
    this.databaseService.getResultsOfTheGame()
      .subscribe((html) => {
        this.content = html[0].value;
      });
  }

  ngOnInit() {
  }

}
