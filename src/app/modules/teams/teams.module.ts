import { NgModule } from '@angular/core';
import { TeamsService } from './components/teams.service';
import { TeamListComponent } from './components/team-list/team-list.component';

@NgModule({
  declarations: [
    TeamListComponent
  ],
  providers: [
    TeamsService
  ]
})
export class TeamsModule {}
