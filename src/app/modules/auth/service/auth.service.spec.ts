import { TestBed, inject } from '@angular/core/testing';
import { authService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('authService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [authService],
    });
  });

  it('should be created', inject([authService], (service: authService) => {
    expect(service).toBeTruthy();
  }));
});
