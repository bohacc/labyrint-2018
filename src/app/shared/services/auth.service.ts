import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { UserAuthAction } from '../../modules/teams/state/actions/userAuth.actions';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.store.dispatch(new UserAuthAction(auth));
    });
  }

  public facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.authState = user
        // this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.authState = user
        // this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(
        () => console.log('email sent')
      )
      .catch(
        (error) => console.log(error)
      );
  }

  public logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        this.store.dispatch(new UserAuthAction(credential.user));
        // this.authState = credential.user;
        // this.updateUserData();
      })
      .catch(error => console.log(error));
  }
}
