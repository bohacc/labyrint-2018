import {
  Component, OnInit, ChangeDetectorRef, OnDestroy,
  HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './shared/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuthAction } from './state/actions/userAuth.actions';
import { UserAuthDto } from './shared/model/UserAuthDto';
import { DatabaseService } from './shared/services/database.service';

declare const grecaptcha: any;

declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public userAuth: Observable<UserAuthDto>;
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public smurf4style = '0';
  @HostListener('window:resize') onResize(event) {
    this.smurf4style = this.getScrollBarWidth() + '';
  }

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private afAuth: AngularFireAuth,
    private databaseService: DatabaseService
  ) {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        const userAuth: UserAuthDto = {
          email: user ? user.email : null,
          uid: user ? user.uid : null,
          isLoged: !!user,
          url: user ? user['A'] : null
        };
        this.store.dispatch(new UserAuthAction(userAuth));
        this.databaseService.getLoginTeam(userAuth);
      },
      (error) => {
        console.log(error);
      }
    );
    this.userAuth = this.store.select(state => {
      return state.userAuth;
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges(); 
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.smurf4style = this.getScrollBarWidth() + '';
  }

  public logout() {
    this.authService.logout();
  }

  public getScrollBarWidth () {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild (inner);

    document.body.appendChild (outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
      w2 = outer.clientWidth;
    }

    document.body.removeChild (outer);

    return (w1 - w2);
  }
}
