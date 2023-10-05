import { Component, Input, OnInit } from '@angular/core';
import { apiService } from 'src/app/modules/project-manager/service/api.service';
import { ITask } from 'src/app/modules/project-manager/interface/response.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { toastService } from 'src/app/core/services/toast.service';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() taskFormGroup!: FormGroup;
  tasksSelect!: ITask[];
  panelOpenState = false;
  constructor(
    private apiService: apiService,
    private fb: FormBuilder,
    private toastService: toastService,
    private projectService: projectService
  ) {}
  handleShowError() {
    if (this.tasksFormArray.errors) {
      this.toastService.showErrors('Project must have at least 1 task!', 3000);
    }
  }
  
  get tasksFormArray() {
    return this.taskFormGroup.get('tasks') as FormArray;
  }

  splitSeparateTask(data: ITask[], type: number) {
    return data
      .filter((data) => data.type === type)
      .map((task) => ({ ...task, billable: true }));
  }

  handleGetAllTasks() {
    this.apiService.getAllTasks().subscribe((tasks) => {
      this.projectService.taskDataSelect.next(tasks.result);
      this.splitSeparateTask(tasks.result, 0).forEach((task) =>
        this.tasksFormArray.push(this.fb.control(task))
      );
      this.tasksSelect = this.splitSeparateTask(tasks.result, 1);
    });
  }
  ngOnInit(): void {
    this.handleGetAllTasks();
  }
}
