import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit {
  public rules$: Observable<string>;

  constructor(
    private databaseService: DatabaseService,
  ) {
    this.rules$ = this.databaseService.getRulesOfTheGame();
  }

  ngOnInit() {
  }

}
