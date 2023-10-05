import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { authService } from '../../service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { toastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpSpy: jasmine.SpyObj<authService>;
  let toastSpy: jasmine.SpyObj<toastService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    httpSpy = jasmine.createSpyObj('authService', ['login']);
    toastSpy = jasmine.createSpyObj('authService', [
      'showSuccess',
      'showErrors',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        authService,
        { provide: authService, useValue: httpSpy },
        { provide: toastService, useValue: toastSpy },
        { provide: Router, useValue: routerSpy },
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpSpy = TestBed.inject(authService) as jasmine.SpyObj<authService>;
    toastSpy = TestBed.inject(toastService) as jasmine.SpyObj<toastService>;
  });

  beforeEach(() => {
    component.inforUserAccount = new FormGroup({
      username: new FormControl('testuser', Validators.required),
      password: new FormControl('testpassword', Validators.required),
    });
    toastSpy.isLoading = new BehaviorSubject<boolean>(false);
    httpSpy.login.and.returnValue(
      of({
        accessToken: 'testAccesstoken',
        encryptedAccessToken: 'test',
        expireInSeconds: 12121212,
        userId: 12,
      })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return `true` when form login invalid (required field)', () => {
    component.inforUserAccount.setValue({
      username: 'admin',
      password: '',
    });
    expect(component.inforUserAccount.invalid).toBeTrue();
  });

  it('should return `true` for required field that is touched and has error', () => {
    component.inforUserAccount.get('username')?.markAsTouched();
    component.inforUserAccount.setValue({
      username: '',
      password: '',
    });
    const result = component.handleCheckValidate('username');
    expect(result).toBeTrue();
  });

  it('should return `false` for required field that is not touched', () => {
    component.inforUserAccount.setValue({
      username: '',
      password: '',
    });
    const result = component.handleCheckValidate('username');
    expect(result).toBeFalse();
  });

  it('should handle login successfully', () => {
    component.handleLogin();
    expect(component.isSubmited).toBeTrue();
    expect(httpSpy.login).toHaveBeenCalledWith({
      userNameOrEmailAddress: 'testuser',
      password: 'testpassword',
      rememberClient: false,
    });
    expect(toastSpy.showSuccess).toHaveBeenCalledWith(
      'Login Successfully!',
      2000
    );
    toastSpy.isLoading.next(true);
    toastSpy.isLoading.subscribe((loading) => {
      expect(loading).toBeTrue();
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['project']);
  });

  // it('should show error when login fail', () => {
  //   component.handleLogin();
  //   expect(component.isSubmited).toBeTrue();
  //   httpSpy.login.and.returnValue(
  //     new Observable((observer) => {
  //       observer.error({});
  //     })
  //   );

  //   expect(toastSpy.showErrors).toHaveBeenCalledWith(
  //     'Username or password is not correct!',
  //     2000
  //   );
  // });
});
