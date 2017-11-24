import { NgModule } from '@angular/core';
import { TeamsService } from './components/teams.service';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamsComponent } from './components/teams/teams.component';
import { routes } from './teams.routes';
import { RouterModule } from '@angular/router';
import { RegistrationModule } from '../registration/registration.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TeamListComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    RegistrationModule
  ],
  providers: [
    TeamsService
  ]
})
export class TeamsModule {}
