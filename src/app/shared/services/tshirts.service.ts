import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoadTShirtsAction } from '../../modules/teams/state/actions/tshirts.action';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TShirt } from '../../modules/teams/models/TShirt';

@Injectable()
export class TshirtsService {
  private itemsRef: AngularFireList<{tshirts: TShirt}[]>;

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('tshirts');
  }

  public loadTShirts() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .subscribe(
        (tshirts: TShirt[]) => {
          console.log('TSHIRTS');
          console.log(tshirts);
          this.store.dispatch(new LoadTShirtsAction(tshirts));
        }
      );
  }
}
