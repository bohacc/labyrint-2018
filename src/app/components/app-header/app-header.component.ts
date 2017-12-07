import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { UserAuthDto } from '../../modules/teams/models/UserAuthDto';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

@Component({
    selector: 'app-header',
    templateUrl: 'app-header.component.html'
})
export class AppHeaderComponent {
  public userAuth: Observable<UserAuthDto>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.userAuth = this.store.select(state => {
      return state.userAuth;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
