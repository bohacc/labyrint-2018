import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadTShirtsAction } from '../state/actions/tshirts.action';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { TshirtDto } from '../../../shared/model/TshirtDto';
import { State } from '../state/reducers/module.reducer';

@Injectable()
export class TshirtsService implements OnDestroy {
  private itemsRef: AngularFireList<{tshirts: TshirtDto}[]>;
  private unsubscribe: Subject<any> = new Subject();
  private tshirts: TshirtDto[];

  constructor(
    private store: Store<State>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('tshirts', ref => ref.orderByChild('sort_order') );
    this.store.select(state => state)
      .takeUntil(this.unsubscribe)
      .subscribe((state) => {
        this.tshirts = state.teams.tshirts.list;
      });
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

  public getTshirts(code: string): TshirtDto {
    return this.tshirts.filter((tshirt) => {
      return tshirt.value === code;
    })[0];
  }
}
