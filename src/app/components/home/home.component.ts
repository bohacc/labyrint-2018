import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  public news: string[];

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.databaseService.getNews()
      .subscribe((news) => {
        this.news = news;
      });
  }
}
