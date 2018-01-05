import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit {
  public content = '';

  constructor(
    private databaseService: DatabaseService,
  ) {
    this.databaseService.getRulesOfTheGame()
      .subscribe((html) => {
        this.content = html[0].value;
      });
  }

  ngOnInit() {
  }

}
