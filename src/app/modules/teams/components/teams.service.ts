import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class TeamsService {
  constructor(private db: AngularFireDatabase) { }

  getTeams(): Observable<any[]> {
    return this.db.list('/teams').valueChanges();
  }
}
