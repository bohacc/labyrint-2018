import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { UserAuthAction } from '../../modules/teams/state/actions/userAuth.actions';
import * as firebase from 'firebase/app';
import { UserAuthDto } from '../../modules/teams/models/UserAuthDto';
import { stringifyElement } from '@angular/platform-browser/testing/src/browser_util';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
      console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
      console.log(user);
      const userAuth: UserAuthDto = {
        email: user ? user.email : null,
        uid: user ? user.uid : null,
        isLoged: !!user,
        url: user ? user['A'] : null
      };
      this.store.dispatch(new UserAuthAction(userAuth));
      },
      (error) => {
        console.log(error);
      }
    );

    /*this.afAuth.auth.app.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });*/
    /*this.afAuth.idToken.subscribe((token) => {
      console.log(token);
      this.store.dispatch(new UserAuthAction(user));
    });*/
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
    this.afAuth.auth.signOut()
      .then(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
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
