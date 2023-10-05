import { NgModule } from '@angular/core';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ProjectComponent } from './project/project.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateFilterSearchProjectComponent } from './project/components/main/create-filter-search-project/create-filter-search-project.component';
import { ProjectItemComponent } from './project/components/main/project-item/project-item.component';
import { ChipLabelComponent } from 'src/app/shared/components/chip-label/chip-label.component';
import { CreateOrEditProjectModule } from './project/components/create-or-edit-project/create-or-edit-project.module';
import { ViewComponent } from './project/components/view/view.component';
import { ViewTeamComponent } from './project/components/view/view-team/view-team.component';
import { ViewTasksComponent } from './project/components/view/view-tasks/view-tasks.component';
import { CustomTimeDialogComponent } from './project/components/view/custom-time-dialog/custom-time-dialog.component';
import { ProjectTypePipe } from 'src/app/shared/pipes/project-type.pipe';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './project/components/create-or-edit-project/create-or-edit-project.module'
      ).then((m) => m.CreateOrEditProjectModule),
  },
];
@NgModule({
  declarations: [
    ProjectComponent,
    ViewComponent,
    CreateFilterSearchProjectComponent,
    ProjectItemComponent,
    ViewTeamComponent,
    ViewTasksComponent,
    CustomTimeDialogComponent,
    ProjectTypePipe,
  ],
  imports: [
    CreateOrEditProjectModule,
    LayoutModule,
    MaterialModule,
    SharedModule,
    ChipLabelComponent,
    RouterModule.forChild(routes),
  ],
})
export class ProjectManagerModule {}
