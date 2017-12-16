import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { LoadTShirtsAction } from '../../modules/teams/state/actions/tshirts.action';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TShirt } from '../../modules/teams/models/TShirt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class TshirtsService implements OnDestroy {
  private itemsRef: AngularFireList<{tshirts: TShirt}[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('tshirts');
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public loadTShirts() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .takeUntil(this.unsubscribe)
      .subscribe(
        (tshirts: TShirt[]) => {
          console.log('TSHIRTS');
          console.log(tshirts);
          this.store.dispatch(new LoadTShirtsAction(tshirts));
        }
      );
  }
}
