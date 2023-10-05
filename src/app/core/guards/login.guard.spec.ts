import { TestBed } from '@angular/core/testing';
import { LoginGuard } from './login.guard';
import { authService } from 'src/app/modules/auth/service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
describe('LoginGuard', () => {
  let authServicespy: jasmine.SpyObj<authService>;
  let router: Router;
  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('authService', [
      'getAccessTokenLocalStorage',
    ]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LoginGuard, { provide: authService, useValue: authSpy }],
    });
    authServicespy = TestBed.inject(authService) as jasmine.SpyObj<authService>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should be navigate when user login', () => {
    const guardLog = new LoginGuard(authServicespy, router);
    expect(guardLog.canActivate()).toBeTruthy();
  });
});
