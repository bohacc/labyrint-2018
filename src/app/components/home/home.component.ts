import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public news: string[];
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private databaseService: DatabaseService
  ) {}

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.databaseService.getNews()
      .subscribe((news) => {
        this.news = news;
      });
  }
}
