import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GameRulesComponent } from './components/game-rules/game-rules.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CiphersComponent } from './components/ciphers/ciphers.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game-rules', component: GameRulesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'ciphers', component: CiphersComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'teams', loadChildren: 'app/modules/teams/teams.module#TeamsModule' },
];
