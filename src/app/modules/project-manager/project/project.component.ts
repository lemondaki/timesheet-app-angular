import { Component, OnInit } from '@angular/core';
import { projectService } from '../service/project.service';
import { EStatusNumber } from '../enum/project.enum';
import { IProject } from '../interface/response.interface';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projectData: IProject[][] = [];
  isLoading: boolean = false;
  statusNumber = EStatusNumber;
  currentStatusNumber: number = EStatusNumber.ACTIVE;
  currentSearchValue: string = '';
  constructor(private projectService: projectService) {}

  ngOnInit(): void {
    this.projectService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.projectService.projectData.subscribe((data) => {
      this.projectData = data;
    });

    this.projectService.currentSeacrhValue.subscribe((searchValue) => {
      this.currentSearchValue = searchValue;
    });

    this.projectService.currentFilterNumber.subscribe((statusNumber) => {
      this.currentStatusNumber = statusNumber;
    });
  }
}
