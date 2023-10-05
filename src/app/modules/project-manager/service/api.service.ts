import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  IBranchFilter,
  ICustomer,
  IProjectData,
  IQuantityProject,
  IStatusProject,
} from '../interface/project.interface';
import { IProject, ITask } from '../interface/response.interface';
import { IProjectResponse } from '../interface/response.interface';
import { ITeamUser } from '../interface/response.interface';
import { EStatusNumber, EStatusProjectValue } from '../enum/project.enum';
import { projectService } from './project.service';
@Injectable({
  providedIn: 'root',
})
export class apiService {
  constructor(
    private http: HttpClient,
    private projectService: projectService
  ) {}
  baseUrlProject = `${environment.baseUrl}services/app/Project`;
  baseUrlCustomer = `${environment.baseUrl}services/app/Customer/GetAll`;
  baseUrlBranch = `${environment.baseUrl}services/app/Branch/GetAllBranchFilter`;
  baseUrlTeamUser = `${environment.baseUrl}services/app/User/GetUserNotPagging`;
  baseUrlTask = `${environment.baseUrl}services/app/Task/GetAll`;
  baseUrlSaveProject = `${environment.baseUrl}services/app/Project/Save`;
  baseUrlGetProject = `${environment.baseUrl}services/app/Project/Get`;
  dataSubject = new BehaviorSubject(null);
  projectStatus: IStatusProject[] = [
    {
      value: EStatusNumber.ACTIVE,
      name: EStatusProjectValue.ACTIVE,
      quantity: 0,
    },
    {
      value: EStatusNumber.DEACTIVE,
      name: EStatusProjectValue.DEACTIVE,
      quantity: 0,
    },
    { value: EStatusNumber.ALL, name: EStatusProjectValue.ALL, quantity: 0 },
  ];

  getAllProject(
    searchQuery: string = '',
    status?: number
  ): Observable<IProject[][]> {
    this.projectService.isLoading.next(true);
    return this.http
      .get<IProjectResponse<IProject[]>>(
        `${this.baseUrlProject}/GetAll?status=${
          status === EStatusNumber.ALL ? '' : status
        }&search=${searchQuery}`
      )
      .pipe(map((data) => this.formatDataProjects(data.result)));
  }

  formatDataProjects(projects: IProject[]) {
    const allClients = new Set(
      projects.map((data: IProject) => data.customerName)
    );
    const formatData = [...allClients].map((client) =>
      projects.filter((s: IProject) => s.customerName === client)
    );
    return formatData;
  }

  getAllCustomer(): Observable<IProjectResponse<ICustomer[]>> {
    return this.http.get<IProjectResponse<ICustomer[]>>(
      `${this.baseUrlCustomer}`
    );
  }

  getAllTasks(): Observable<IProjectResponse<ITask[]>> {
    return this.http.get<IProjectResponse<ITask[]>>(`${this.baseUrlTask}`);
  }

  getAllBranchFilter(isAll: boolean = true): Observable<IBranchFilter[]> {
    return this.http
      .get<IProjectResponse<IBranchFilter[]>>(
        `${this.baseUrlBranch}?isAll=${isAll}`
      )
      .pipe(map((branchData) => branchData.result));
  }

  getAllTeamUser(): Observable<ITeamUser[]> {
    return this.http
      .get<IProjectResponse<ITeamUser[]>>(`${this.baseUrlTeamUser}`)
      .pipe(map((teamData) => teamData.result));
  }

  deleteProject(id: number): Observable<IProjectResponse<IProject>> {
    return this.http.delete<IProjectResponse<IProject>>(
      `${this.baseUrlProject}/Delete?Id=${id}`
    );
  }

  deactiveProject(id: number): Observable<IProjectResponse<IProject>> {
    return this.http.post<IProjectResponse<IProject>>(
      `${this.baseUrlProject}/Inactive`,
      { id }
    );
  }

  activeProject(id: number): Observable<IProjectResponse<IProject>> {
    return this.http.post<IProjectResponse<IProject>>(
      `${this.baseUrlProject}/Active`,
      { id }
    );
  }

  getQuantityProject(): Observable<IStatusProject[]> {
    return this.http
      .get<IProjectResponse<IQuantityProject[]>>(
        `${this.baseUrlProject}/GetQuantityProject`
      )
      .pipe(
        map((data) => {
          const activeProejct = data.result[0].quantity;
          const deactiveProejct = data.result[1].quantity;
          const allProject = activeProejct + deactiveProejct;
          this.projectStatus.forEach((s) => {
            if (s.value === EStatusNumber.ACTIVE) {
              s.quantity = activeProejct;
              return;
            }
            if (s.value === EStatusNumber.DEACTIVE) {
              s.quantity = deactiveProejct;
              return;
            }
            if (s.value === EStatusNumber.ALL) {
              s.quantity = allProject;
            }
          });
          return this.projectStatus;
        })
      );
  }

  createOrEitProject(
    data: IProjectData
  ): Observable<IProjectResponse<IProjectData>> {
    return this.http.post<IProjectResponse<IProjectData>>(
      this.baseUrlSaveProject,
      data
    );
  }

  getProjectbyId(id: number): Observable<IProjectResponse<IProjectData>> {
    return this.http.get<IProjectResponse<IProjectData>>(
      this.baseUrlGetProject,
      {
        params: {
          input: id,
        },
      }
    );
  }
}
