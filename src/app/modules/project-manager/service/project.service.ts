import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProject, ITask, ITeamUser } from '../interface/response.interface';
import { EStatusNumber } from '../enum/project.enum';

@Injectable({
  providedIn: 'root',
})
export class projectService {
  isLoading = new BehaviorSubject<boolean>(false);
  isGetQuantity = new BehaviorSubject<boolean>(false);
  currentSeacrhValue = new BehaviorSubject<string>('');
  currentFilterNumber = new BehaviorSubject<number>(EStatusNumber.ACTIVE);
  projectData = new BehaviorSubject<IProject[][]>([]);
  teamMemberSelect = new Subject<ITeamUser>();
  teamMemberRemove = new BehaviorSubject<ITeamUser | null>(null);
  teamMemberData = new BehaviorSubject<ITeamUser[]>([]);
  teamMemberDataEdit = new BehaviorSubject<any>(null);
  taskSelect = new BehaviorSubject<ITask | null>(null);
  taskDataSelect = new BehaviorSubject<ITask[]>([]);
  taskRemove = new BehaviorSubject<ITask | null>(null);
  editProjectId = new BehaviorSubject<{ id: number }>({ id: 0 });
}
