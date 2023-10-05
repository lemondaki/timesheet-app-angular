import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ITimeStatisticMember,
  ITimeStatisticTask,
} from '../interface/view.interface';
import { IProjectResponse } from '../interface/response.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  baseStatisticUrl = `${environment.baseUrl}services/app/TimeSheetProject/GetTimeSheetStatistic`;
  projectViewId = new Subject<number>();
  constructor(private http: HttpClient) {}

  GetTimeSheetStatisticTeams(
    projectId: number,
    startDate: string,
    endDate: string
  ): Observable<IProjectResponse<ITimeStatisticMember[]>> {
    return this.http.get<IProjectResponse<ITimeStatisticMember[]>>(
      `${this.baseStatisticUrl}Teams?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  GetTimeSheetStatisticTasks(
    projectId: number,
    startDate: string,
    endDate: string
  ): Observable<IProjectResponse<ITimeStatisticTask[]>> {
    return this.http.get<IProjectResponse<ITimeStatisticTask[]>>(
      `${this.baseStatisticUrl}Tasks?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`
    );
  }
}
