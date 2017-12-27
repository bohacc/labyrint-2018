import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

@Injectable()
export class AuthGuardService implements CanActivate {
  private isAuth$;
  private isLoged: boolean;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.store.select(state => state.userAuth.isLoged)
      .subscribe((isLoged) => {
        this.isLoged = !!isLoged;
      });
  }

  canActivate() {
    if (this.isLoged) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
