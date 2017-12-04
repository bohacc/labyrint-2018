import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'uvod', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'teams', loadChildren: 'app/modules/teams/teams.module#TeamsModule' },
];
