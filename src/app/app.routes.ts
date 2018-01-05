import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { CiphersComponent } from './components/ciphers/ciphers.component';
import { ResultsComponent } from './components/results/results.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { LogoutSuccessComponent } from './components/logout-success/logout-success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-success', component: LoginSuccessComponent },
  { path: 'logout-success', component: LogoutSuccessComponent },
  { path: 'game-rules', component: GameRulesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'ciphers', component: CiphersComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'teams', loadChildren: 'app/modules/teams/teams.module#TeamsModule' },
];
