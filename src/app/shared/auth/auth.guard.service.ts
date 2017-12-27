import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      });
  }
}
