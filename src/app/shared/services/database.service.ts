import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {
  constructor(
    private db: AngularFireDatabase
  ) {

  }

  public getNews(): Observable<any> {
    return this.db.list('news').valueChanges();
  }
}
