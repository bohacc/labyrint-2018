import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public content = '';

  constructor(
    private databaseService: DatabaseService,
  ) {
    this.databaseService.getContactOfTheGame()
      .subscribe((html) => {
        this.content = html[0].value;
      });
  }

  ngOnInit() {
  }

}
