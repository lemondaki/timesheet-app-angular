import { TestBed, inject } from '@angular/core/testing';
import { projectService } from './project.service';

describe('projectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [projectService],
    });
  });

  it('should be created', inject(
    [projectService],
    (service: projectService) => {
      expect(service).toBeTruthy();
    }
  ));
});
