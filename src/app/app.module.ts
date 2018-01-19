import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceModule } from './modules/shared-service.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/reducers/app.reducer';
import { HomeComponent } from './components/home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './shared/utils';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './modules/material/material.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertComponent } from './components/alerts/alert/alert.component';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { ResultsComponent } from './components/results/results.component';
import { CiphersComponent } from './components/ciphers/ciphers.component';
import { ToolsService } from './shared/services/tools.service';
import { AuthGuardService } from './shared/auth/auth.guard.service';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { DatabaseService } from './shared/services/database.service';
import { EffectsModule } from '@ngrx/effects';
import { TrustHtmlPipe } from './shared/pipes/trust-html/trust-html.pipe';
import { LogoutSuccessComponent } from './components/logout-success/logout-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertsComponent,
    AlertComponent,
    GameRulesComponent,
    NewsComponent,
    ContactComponent,
    ResultsComponent,
    CiphersComponent,
    LoginSuccessComponent,
    TrustHtmlPipe,
    LogoutSuccessComponent
  ],
  entryComponents: [
    AlertComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    /*StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })*/
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }) : [],
    SharedServiceModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CustomMaterialModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'cs' },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    MediaMatcher,
    ToolsService,
    AuthGuardService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
