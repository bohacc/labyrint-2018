import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { LoadFoodsAction } from '../state/actions/foods.actions';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Food } from '../models/FoodDto';

@Injectable()
export class FoodService implements OnDestroy {
  private itemsRef: AngularFireList<{food: Food}[]>;
  private unsubscribe: Subject<any> = new Subject();
  private foods: Food[];

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = this.db.list('foods', ref => ref.orderByChild('sort_order'));
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  public loadFoods() {
    this.itemsRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({...c.payload.val()}));
      })
      .takeUntil(this.unsubscribe)
      .subscribe(
        (foods: Food[]) => {
          this.store.dispatch(new LoadFoodsAction(foods));
          this.foods = foods;
        }
      );
  }

  public getFood(code: string): Food {
    return this.foods.filter((food) => {
      return food.value === code;
    })[0];
  }
}
