import {
  Component, OnInit, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef, OnDestroy,
  HostListener
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ReCaptchaDirective } from './modules/captcha/directives/recaptcha.directive';
import { StoreService } from './shared/store/store.service';
import { AuthService } from './shared/services/auth.service';
import { UserAuthDto } from './modules/teams/models/UserAuthDto';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';

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
    console.log(this.getScrollBarWidth());
    this.smurf4style = this.getScrollBarWidth() + '';
  }

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.userAuth = this.store.select(state => {
      return state.userAuth;
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userAuth = this.store.select(state => {
      return state.userAuth;
    });
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
