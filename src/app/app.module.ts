import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceModule } from './modules/shared-service.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { RegistrationModule } from './modules/registration/registration.module';
import { TeamsModule } from './modules/teams/teams.module';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './state/app.reducer';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(AppReducer),
    SharedServiceModule,
    RouterModule.forRoot(routes),
    TeamsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
