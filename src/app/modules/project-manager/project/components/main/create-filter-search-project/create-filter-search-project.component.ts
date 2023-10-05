import { Component, OnInit } from '@angular/core';
import { EStatusNumber } from 'src/app/modules/project-manager/enum/project.enum';
import { IStatusProject } from 'src/app/modules/project-manager/interface/project.interface';
import { projectService } from 'src/app/modules/project-manager/service/project.service';
import { apiService } from 'src/app/modules/project-manager/service/api.service';
import { IProject } from 'src/app/modules/project-manager/interface/response.interface';
@Component({
  selector: 'app-create-filter-search-project',
  templateUrl: './create-filter-search-project.component.html',
  styleUrls: ['./create-filter-search-project.component.scss'],
})
export class CreateFilterSearchProjectComponent implements OnInit {
  currentStatusNumber: number = EStatusNumber.ACTIVE;
  currentSearchValue: string = '';
  projectStatus: IStatusProject[] = [];

  onInputSearchChange() {
    this.projectService.currentSeacrhValue.next(this.currentSearchValue);
  }

  handleGetAllQuantityProject() {
    this.apiService.getQuantityProject().subscribe((result) => {
      this.projectStatus = result;
    });
  }

  handleGetAllProject() {
    this.projectService.currentFilterNumber.next(this.currentStatusNumber);
    this.apiService
      .getAllProject(this.currentSearchValue, this.currentStatusNumber)
      .subscribe((result: IProject[][]) => {
        this.handleGetAllQuantityProject();
        this.projectService.projectData.next(result);
        this.projectService.isLoading.next(false);
      });
  }

  constructor(
    private projectService: projectService,
    private apiService: apiService
  ) {}

  ngOnInit(): void {
    this.handleGetAllProject();
    this.projectService.isGetQuantity.subscribe(() => {
      this.handleGetAllQuantityProject();
    });
  }
}
