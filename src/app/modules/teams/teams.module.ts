import { NgModule } from '@angular/core';
import { TeamsService } from './teams.service';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamsComponent } from './components/teams/teams.component';
import { routes } from './teams.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';
import { ReCaptchaModule } from '../captcha/ReCaptcha.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TeamListComponent,
    TeamsComponent,
    TeamRegistrationComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReCaptchaModule,
    CustomMaterialModule
  ],
  providers: [
    TeamsService
  ]
})
export class TeamsModule {}
