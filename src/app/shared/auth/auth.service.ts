import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { UserAuthAction } from '../../state/actions/userAuth.actions';
import * as firebase from 'firebase/app';
import { ErrorDto } from '../model/ErrorDto';
import * as ErrorsActions from '../../state/actions/errors.actions';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private store: Store<AppState>
  ) {
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
      .then(
        (user) => {
          this.router.navigate(['login-success']);
        },
        (err) => {
          let text = '';
          if (err && err.code === 'auth/user-not-found') {
            text = 'Zadaný uživatel neexistuje';
          } else if (err && err.code === 'auth/wrong-password') {
            text = 'Chybné jméno nebo heslo';
          } else {
            text = 'Došlo k chybě při přihlášení, zkuste akci opakovat.';
          }
          const error: ErrorDto = {
            code: 'LOGIN_ERROR',
            title: 'Chyba přihlášení',
            description: text
          };
          this.store.dispatch(new ErrorsActions.ErrorAction([error]));
          console.log(err);
        }
      )
      .catch( (err) => {
        const error: ErrorDto = {
          code: 'LOGIN_ERROR',
          title: 'Chyba přihlášení',
          description: 'Došlo k chybě při přihlášení, zkuste akci opakovat.'
        };
        this.store.dispatch(new ErrorsActions.ErrorAction([error]));
        console.log(err);
      });
  }

  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(
        () => {
          console.log('email sent');
        }
      )
      .catch(
        (error) => console.log(error)
      );
  }

  public logout(): void {
    this.afAuth.auth.signOut()
      .then(
        () => {
          this.router.navigate(['/logout-success']);
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
