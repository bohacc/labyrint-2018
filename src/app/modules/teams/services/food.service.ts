import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadFoodAction } from '../state/actions/food.actions';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Food } from '../models/foodDto';

@Injectable()
export class FoodService implements OnDestroy {
  private itemsRef: AngularFireList<{food: Food}[]>;
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('food');
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public loadFood() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .takeUntil(this.unsubscribe)
      .subscribe(
        (food: Food[]) => {
          this.store.dispatch(new LoadFoodAction(food));
        }
      );
  }
}
