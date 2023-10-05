import { Component, Input, OnInit } from '@angular/core';
import {
  INotificationItem,
  IProjectData,
  projectTargetUsers,
} from 'src/app/modules/project-manager/interface/project.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  ITask,
  ITeamUser,
} from 'src/app/modules/project-manager/interface/response.interface';
import { apiService } from 'src/app/modules/project-manager/service/api.service';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
import { toastService } from 'src/app/core/services/toast.service';
import { EProjectTypeNotification } from 'src/app/modules/project-manager/enum/project.enum';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() myFormData!: FormGroup;
  @Input() notificationFormGroup!: FormGroup;
  notifiList!: FormArray;
  formDataCreate!: IProjectData;
  editProjectId: { id: number } = { id: 0 };
  typeNotification: INotificationItem[] = [
    { id: 0, type: EProjectTypeNotification.SUBMIT_TIMESHEET, isNotice: true },
    {
      id: 1,
      type: EProjectTypeNotification.REQUEST_OFF,
      isNotice: true,
    },
    {
      id: 2,
      type: EProjectTypeNotification.APPROVE_REQUEST_OFF,
      isNotice: true,
    },
    {
      id: 3,
      type: EProjectTypeNotification.REQUEST_CHANGE_TIME,
      isNotice: true,
    },
    {
      id: 4,
      type: EProjectTypeNotification.APPROVE_REQUEST_CHANGE_TIME,
      isNotice: true,
    },
  ];
  constructor(
    private fb: FormBuilder,
    private apiService: apiService,
    private projectService: projectService,
    private toastService: toastService
  ) {}

  get NotifiFormArray() {
    return this.notificationFormGroup.get('notifiList') as FormArray;
  }

  handleFormatData() {
    this.formDataCreate = {
      ...this.myFormData.controls['generalFormGroup'].value,
    };
    const tasks = this.myFormData.controls['taskFormGroup'].value.tasks.map(
      (task: ITask) => ({
        taskId: task.id,
        billable: task.billable,
      })
    );
    const users = this.myFormData.controls['teamFormGroup'].value.users.map(
      (user: ITeamUser) => ({
        userId: user.id,
        type: user.type,
        isTemp: user.isTemp,
      })
    );
    const projectTargetUsers: projectTargetUsers[] = [];
    const komuChannelId =
      this.myFormData.controls['notificationFormGroup'].value.komuChannelId;
    const [
      { isNotice: isNoticeKMSubmitTS },
      { isNotice: isNoticeKMRequestOffDate },
      { isNotice: isNoticeKMApproveRequestOffDate },
      { isNotice: isNoticeKMRequestChangeWorkingTime },
      { isNotice: isNoticeKMApproveChangeWorkingTime },
    ] = this.myFormData.controls['notificationFormGroup'].value.notifiList;
    return {
      ...this.formDataCreate,
      tasks,
      users,
      projectTargetUsers,
      komuChannelId,
      isNotifyToKomu: true,
      isNoticeKMSubmitTS,
      isNoticeKMRequestOffDate,
      isNoticeKMApproveRequestOffDate,
      isNoticeKMRequestChangeWorkingTime,
      isNoticeKMApproveChangeWorkingTime,
      isAllUserBelongTo: true,
      id: this.editProjectId?.id,
    };
  }

  handleCreateOrEditProject() {
    const data = this.handleFormatData();
    console.log(data);
    this.apiService.createOrEitProject(data).subscribe({
      next: () => {
        if (this.editProjectId.id) {
          this.toastService.showSuccess('Edit Project Successfully', 3000);
        } else {
          this.toastService.showSuccess('Create Project Successfully', 3000);
        }
      },
      error: () => {
        if (this.editProjectId.id) {
          this.toastService.showErrors('Edit Project Failure', 3000);
        } else {
          this.toastService.showErrors('Create Project Failure', 3000);
        }
      },
    });
  }

  ngOnInit(): void {
    this.typeNotification.forEach((noti) =>
      this.NotifiFormArray.push(this.fb.control(noti))
    );
    this.projectService.editProjectId.subscribe((editId) => {
      if (editId.id) {
        this.editProjectId.id = editId.id * 1;
      } else this.editProjectId.id = 0;
    });
    this.notifiList = this.NotifiFormArray;
  }
}
