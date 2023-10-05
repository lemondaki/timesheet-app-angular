import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  INotificationItem,
  IProjectData,
} from '../../../interface/project.interface';
import { apiService } from '../../../service/api.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  ITask,
  ITaskPost,
  ITeamUser,
  ITeamUserResponse,
} from '../../../interface/response.interface';
import { projectService } from '../../../service/project.service';
import { FormService } from '../../../service/form.service';
@Component({
  selector: 'app-create-or-edit-project',
  templateUrl: './create-or-edit-project.component.html',
  styleUrls: ['./create-or-edit-project.component.scss'],
})
export class CreateOrEditProjectComponent implements OnInit {
  myFormData: FormGroup;
  generalFormGroup!: FormGroup;
  taskFormGroup!: FormGroup;
  teamFormGroup!: FormGroup;
  notificationFormGroup!: FormGroup;
  teamMemberData!: ITeamUser[];
  taskDataSelect!: ITask[];
  typeNotification = [
    { id: 0, type: 'Submit timesheet', isNotice: true },
    {
      id: 1,
      type: 'Request Off/Remote/Onsite/Đi muộn, về sớm',
      isNotice: true,
    },
    {
      id: 2,
      type: 'Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm',
      isNotice: true,
    },
    { id: 3, type: 'Request Change Working Time', isNotice: true },
    { id: 4, type: 'Approve/Reject Change Working Time', isNotice: true },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: apiService,
    private projectService: projectService,
    private formService: FormService
  ) {
    this.myFormData = this.formService.initFormGroup();
    this.generalFormGroup = this.getFormGroup('generalFormGroup');
    this.teamFormGroup = this.getFormGroup('teamFormGroup');
    this.taskFormGroup = this.getFormGroup('taskFormGroup');
    this.notificationFormGroup = this.getFormGroup('notificationFormGroup');
  }

  getFormGroup(formGroupName: string) {
    return this.myFormData.get(formGroupName) as FormGroup;
  }

  stepSelectionChange(event: StepperSelectionEvent) {
    const selectedStepIndex = event.selectedIndex;
    if (selectedStepIndex === 0) {
      this.router.navigate(['general'], { relativeTo: this.route });
    } else if (selectedStepIndex === 1) {
      this.router.navigate(['team'], { relativeTo: this.route });
    } else if (selectedStepIndex === 2) {
      this.router.navigate(['task'], { relativeTo: this.route });
    } else this.router.navigate(['notification'], { relativeTo: this.route });
  }

  goTo() {
    this.router.navigate([`/general`]);
  }

  get teamFormArray() {
    return this.teamFormGroup.get('users') as FormArray;
  }

  get taskFormArray() {
    return this.taskFormGroup.get('tasks') as FormArray;
  }

  get notifiFormArray() {
    return this.notificationFormGroup.get('notifiList') as FormArray;
  }

  handlePatchDataGeneral(data: IProjectData) {
    const {
      name,
      code,
      status,
      timeStart,
      timeEnd,
      note,
      projectType,
      customerId,
    } = data;
    this.generalFormGroup.patchValue({
      name,
      code,
      status,
      timeStart,
      timeEnd,
      note,
      projectType,
      customerId,
    });
  }

  handlePathTaskValue(data: IProjectData) {
    this.taskFormArray.clear();
    const currentTaskId = data.tasks.map((task: ITaskPost) => task.taskId);
    const currentTask = this.taskDataSelect.filter((task) =>
      currentTaskId.includes(task.id)
    );
    currentTask.forEach((task, index) =>
      this.taskFormArray.push(
        this.fb.control({
          ...task,
          billable: data.tasks[index].billable,
        })
      )
    );
  }

  handlePatchTeamValue(data: IProjectData) {
    const typeMember = data.users.map((user) => user.type);
    const currentTeamUser = data.users.map((user: ITeamUserResponse) =>
      this.teamMemberData.find((teamUser) => teamUser.id === user.userId)
    );
    if (currentTeamUser) {
      this.projectService.teamMemberDataEdit.next(currentTeamUser);
    }
    this.teamFormArray.clear();
    currentTeamUser.forEach((user, index) =>
      this.teamFormArray.push(
        this.fb.control({ ...user, type: typeMember[index], isTemp: false })
      )
    );
  }

  handlePatchNotifiData(data: IProjectData) {
    const {
      komuChannelId,
      isNoticeKMSubmitTS,
      isNoticeKMRequestOffDate,
      isNoticeKMApproveRequestOffDate,
      isNoticeKMRequestChangeWorkingTime,
      isNoticeKMApproveChangeWorkingTime,
    } = data;
    const dataNotification = [
      isNoticeKMSubmitTS,
      isNoticeKMRequestOffDate,
      isNoticeKMApproveRequestOffDate,
      isNoticeKMRequestChangeWorkingTime,
      isNoticeKMApproveChangeWorkingTime,
    ];
    this.notificationFormGroup.patchValue({
      komuChannelId,
    });
    const newNotifiArrray = this.notifiFormArray.value.map(
      (noti: INotificationItem, index: number) => ({
        ...noti,
        isNotice: dataNotification[index],
      })
    );
    this.notifiFormArray.clear();
    newNotifiArrray.forEach((noti: INotificationItem) => {
      this.notifiFormArray.push(this.fb.control(noti));
    });
  }

  handlePatchDataEditForm(id: number) {
    this.projectService.editProjectId.next({ id });
    this.apiService.getProjectbyId(id).subscribe((data) => {
      this.handlePatchDataGeneral(data.result);
      this.handlePatchTeamValue(data.result);
      this.handlePathTaskValue(data.result);
      this.handlePatchNotifiData(data.result);
    });
  }

  ngOnInit() {
    this.projectService.teamMemberData.subscribe((data) => {
      if (data.length > 0) {
        this.teamMemberData = data;
        this.route.params.subscribe((param) => {
          const id = param['id'];
          if (id) {
            this.handlePatchDataEditForm(id);
          } else this.projectService.editProjectId.next({ id: 0 });
        });
      }
    });
    this.projectService.taskDataSelect.subscribe((data) => {
      if (data.length > 0) {
        this.taskDataSelect = data;
      }
    });
  }
}
