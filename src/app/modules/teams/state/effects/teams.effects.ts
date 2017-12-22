/*
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { empty } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TeamsEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(book.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);

      return this.googleBooks.searchBooks(query)
        .takeUntil(nextSearch$)
        .map(books => new book.SearchCompleteAction(books))
        .catch(() => of(new book.SearchCompleteAction([])));
    });

  constructor(private actions$: Actions, private googleBooks: GoogleBooksService) { }
}*/
