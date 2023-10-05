import { Component, Input, OnInit } from '@angular/core';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
import {
  EStatusNumber,
  EConfirmDialogStyle,
  EViewDialogStyle,
} from 'src/app/modules/project-manager/enum/project.enum';
import {
  IError,
  IProject,
} from 'src/app/modules/project-manager/interface/response.interface';
import { MatDialog } from '@angular/material/dialog';
import { toastService } from 'src/app/core/services/toast.service';
import { apiService } from 'src/app/modules/project-manager/service/api.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { switchMap } from 'rxjs';
import { ViewComponent } from '../../view/view.component';
import { ITimeStatisticMember } from 'src/app/modules/project-manager/interface/view.interface';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  isShowAction: boolean = false;
  currentSearchValue: string = '';
  currentFilterNumber: number = 0;
  @Input() projectItem: IProject[] = [];
  statusNumber = EStatusNumber;
  currentStatusNumber: number = EStatusNumber.ACTIVE;
  StatisticTeams!: ITimeStatisticMember[];
  constructor(
    public dialog: MatDialog,
    private toast: toastService,
    private apiService: apiService,
    private projectService: projectService
  ) {}

  openDialog(id: number, name: string, status?: number): void {
    let actionTitle = status ? 'Active' : 'Deactive';
    if (status !== EStatusNumber.DEACTIVE && status !== EStatusNumber.ACTIVE) {
      actionTitle = 'Delete';
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: EConfirmDialogStyle.width,
      height: EConfirmDialogStyle.height,
      data: { actionTitle, name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.currentSearchValue = result?.currentSearchValue;
      this.currentFilterNumber = result?.currentFilterNumber;
      if (result?.isDoAction && actionTitle === 'Delete') {
        this.handleDeleteProject(id);
      }
      if (result?.isDoAction && status === EStatusNumber.DEACTIVE) {
        this.handleActiveProject(id);
      }
      if (result?.isDoAction && status === EStatusNumber.ACTIVE) {
        this.handleDeActiveProject(id);
      }
    });
  }

  openDialogViewDialog(item: IProject) {
    this.dialog.open(ViewComponent, {
      width: EViewDialogStyle.width,
      height: EViewDialogStyle.height,
      data: { projectId: item.id },
    });
  }

  handleDeleteProject(id: number) {
    this.apiService
      .deleteProject(id)
      .pipe(
        switchMap(() =>
          this.apiService.getAllProject(
            this.currentSearchValue,
            this.currentFilterNumber
          )
        )
      )
      .subscribe({
        next: (newProjectData) => {
          this.projectService.isGetQuantity.next(true);
          this.projectService.projectData.next(newProjectData);
          this.toast.showSuccess('Delete project successfully!', 3000);
          this.projectService.isLoading.next(false);
        },
        error: ({ error }) => {
          const errorObj: IError = error.error;
          this.toast.showErrors(errorObj.message, 3000);
          this.projectService.isLoading.next(false);
        },
      });
  }

  handleActiveProject(id: number) {
    this.apiService
      .activeProject(id)
      .pipe(
        switchMap(() =>
          this.apiService.getAllProject(
            this.currentSearchValue,
            this.currentFilterNumber
          )
        )
      )
      .subscribe({
        next: (newProjectData) => {
          this.projectService.isGetQuantity.next(true);
          this.projectService.projectData.next(newProjectData);
          this.toast.showSuccess('Active project successfully!', 3000);
          this.projectService.isLoading.next(false);
        },
        error: ({ error }) => {
          this.toast.showErrors(`${error.error.message}`, 3000);
          this.projectService.isLoading.next(false);
        },
      });
  }

  handleDeActiveProject(id: number) {
    this.apiService
      .deactiveProject(id)
      .pipe(
        switchMap(() =>
          this.apiService.getAllProject(
            this.currentSearchValue,
            this.currentFilterNumber
          )
        )
      )
      .subscribe({
        next: (newProjectData) => {
          this.projectService.isGetQuantity.next(true);
          this.projectService.projectData.next(newProjectData);
          this.toast.showSuccess('Deactive project successfully!', 3000);
          this.projectService.isLoading.next(false);
        },
        error: ({ error }) => {
          this.toast.showErrors(`${error.error.message}`, 3000);
          this.projectService.isLoading.next(false);
        },
      });
  }

  ngOnInit() {
    this.projectService.currentFilterNumber.subscribe((data) => {
      this.currentStatusNumber = data;
    });
  }
}
