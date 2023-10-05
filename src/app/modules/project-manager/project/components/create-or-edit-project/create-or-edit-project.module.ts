import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CreateOrEditProjectComponent } from './create-or-edit-project.component';
import { GeneralComponent } from './general/general.component';
import { TeamComponent } from './team/team.component';
import { TeamMemberItemComponent } from './team/team-member-item/team-member-item.component';
import { TeamMemberSelectedComponent } from './team/team-member-selected/team-member-selected.component';
import { TeamMemberShowComponent } from './team/team-member-show/team-member-show.component';
import { TaskComponent } from './task/task.component';
import { TasksListComponent } from './task/tasks-list/tasks-list.component';
import { TasksSelectComponent } from './task/tasks-select/tasks-select.component';
import { ChipLabelComponent } from 'src/app/shared/components/chip-label/chip-label.component';
import { NotificationComponent } from './notification/notification.component';
import { PipeLevelPipe } from 'src/app/shared/pipes/pipe-level.pipe';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'general',
    component: GeneralComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },
  {
    path: 'task',
    component: TaskComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
];
@NgModule({
  declarations: [
    CreateOrEditProjectComponent,
    GeneralComponent,
    TeamComponent,
    TeamMemberItemComponent,
    TeamMemberSelectedComponent,
    TeamMemberShowComponent,
    TaskComponent,
    TasksListComponent,
    TasksSelectComponent,
    NotificationComponent,
    PipeLevelPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ChipLabelComponent,
    RouterModule.forChild(routes),
  ],
})
export class CreateOrEditProjectModule {}
