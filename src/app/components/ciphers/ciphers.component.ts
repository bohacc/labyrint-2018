import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';

@Component({
  selector: 'app-ciphers',
  templateUrl: './ciphers.component.html',
  styleUrls: ['./ciphers.component.scss']
})
export class CiphersComponent implements OnInit {
  public content: string;

  constructor(
    private databaseService: DatabaseService,
  ) {
    this.databaseService.getCiphersOfTheGame()
      .subscribe((html) => {
        this.content = html[0].value;
      });
  }

  ngOnInit() {
  }

}
