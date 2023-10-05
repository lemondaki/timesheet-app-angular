import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { apiService } from './api.service';
import { ITeamUser } from '../interface/response.interface';
import { IBranchFilter } from '../interface/project.interface';
describe('apiService', () => {
  let service: apiService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [apiService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(apiService);
  });

  it('should be created', inject([apiService], (service: apiService) => {
    expect(service).toBeTruthy();
  }));

  it('should be get getAllTeamUser make `GET` request', () => {
    const teamUser: ITeamUser[] = [];
    service.getAllTeamUser().subscribe((data) => {
      expect(data).toEqual(teamUser);
    });
    const teamUserApi = service.baseUrlTeamUser;
    const req = httpTestingController.expectOne(teamUserApi);
    expect(req.request.method).toEqual('GET');
    req.flush({ result: teamUser });
  });

  it('should be get getAllBranchFilter make `GET` request', () => {
    const branch: IBranchFilter[] = [];
    service.getAllBranchFilter().subscribe((data) => {
      expect(data).toEqual(branch);
    });
    const branchApi = `${service.baseUrlBranch}?isAll=true`;
    const req = httpTestingController.expectOne(branchApi);
    expect(req.request.method).toBe('GET');
    req.flush({ result: branch });
  });

  it('should be get deleteProject make `DELETE` request', () => {
    const isSuccess: boolean = true;
    service.deleteProject(16).subscribe((data) => {
      expect(data.success).toBeTrue();
    });
    const deleteApi = `${service.baseUrlProject}/Delete?Id=16`;
    const req = httpTestingController.expectOne(deleteApi);
    expect(req.request.method).toEqual('DELETE');
    req.flush({ success: isSuccess });
  });
});
