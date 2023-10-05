import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/modules/project-manager/interface/response.interface';
import { projectService } from 'src/app/modules/project-manager/service/project.service';

@Component({
  selector: 'app-tasks-select',
  templateUrl: './tasks-select.component.html',
  styleUrls: ['./tasks-select.component.scss'],
})
export class TasksSelectComponent implements OnInit {
  @Input() tasksSelect!: ITask[];
  constructor(private projectService: projectService) {}

  handleSendTaskSelect(task: ITask) {
    this.projectService.taskSelect.next(task);
    this.tasksSelect = this.tasksSelect.filter((t) => t.id !== task.id);
  }

  ngOnInit(): void {
    this.projectService.taskRemove.subscribe((taskRemove) => {
      if (taskRemove) {
        this.tasksSelect?.unshift(taskRemove);
      }
    });
  }
}
