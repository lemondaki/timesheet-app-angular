import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/modules/project-manager/interface/response.interface';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @Input() tasksFormArray!: FormArray;
  isAllComplete: boolean = true;
  isCheckSomeTask: boolean = true;
  tasksListRender!: AbstractControl;
  constructor(
    private projectService: projectService,
    private fb: FormBuilder
  ) {}
  handleCheckAllbox() {
    const taskListClone = [...this.tasksFormArray.value];
    this.tasksFormArray.clear();
    taskListClone.forEach((task: ITask) => {
      this.tasksFormArray.push(
        this.fb.control({ ...task, billable: this.isAllComplete })
      );
    });
  }

  handleCheckAllComplete() {
    this.isAllComplete = this.tasksFormArray.value.every(
      (task: ITask) => task.billable
    );
  }

  handleRemoveTask(task: ITask, index: number) {
    this.tasksFormArray.removeAt(index);
    this.projectService.taskRemove.next(task);
  }

  handleAddTask(task: ITask) {
    const newTask = this.fb.control({ ...task, billable: true });
    this.tasksFormArray.push(newTask);
    this.projectService.taskDataSelect.next(this.tasksFormArray.value);
  }

  ngOnInit(): void {
    this.projectService.taskSelect.subscribe((task) => {
      if (task) {
        this.handleAddTask(task);
      }
    });
  }
}
