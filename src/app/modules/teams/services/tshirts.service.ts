import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadTShirtsAction } from '../state/actions/tshirts.action';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TShirt } from '../models/TShirtDto';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { TshirtDto } from '../../../shared/model/TshirtDto';

@Injectable()
export class TshirtsService implements OnDestroy {
  private itemsRef: AngularFireList<{tshirts: TshirtDto}[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('tshirts', ref => ref.orderByChild('sort_order') );
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
        (tshirts: TshirtDto[]) => {
          this.store.dispatch(new LoadTShirtsAction(tshirts));
        }
      );
  }
}
