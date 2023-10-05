import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { ProjectComponent } from './modules/project-manager/project/project.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { CreateOrEditProjectComponent } from './modules/project-manager/project/components/create-or-edit-project/create-or-edit-project.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'project',
        component: ProjectComponent,
      },
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project/create',
        component: CreateOrEditProjectComponent,
        loadChildren: () =>
          import('./modules/project-manager/project-manager.module').then(
            (m) => m.ProjectManagerModule
          ),
      },
      {
        path: 'project/edit/:id',
        component: CreateOrEditProjectComponent,
        loadChildren: () =>
          import('./modules/project-manager/project-manager.module').then(
            (m) => m.ProjectManagerModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
