import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from 'src/app/modules/auth/service/auth.service';
import { IUserAccount } from '../../interface/auth.interface';
import { Router } from '@angular/router';
import { toastService } from 'src/app/core/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  inforUserAccount: FormGroup;
  isSubmited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: authService,
    private router: Router,
    private toastService: toastService
  ) {
    this.inforUserAccount = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleCheckValidate(validateField: string) {
    return (
      this.inforUserAccount.controls[validateField].errors?.['required'] &&
      this.inforUserAccount.get(validateField)?.touched
    );
  }

  handleLogin() {
    this.isSubmited = true;
    if (this.inforUserAccount.invalid) {
      return;
    }
    const userAccount: IUserAccount = {
      userNameOrEmailAddress: this.inforUserAccount.controls['username'].value,
      password: this.inforUserAccount.controls['password'].value,
      rememberClient: false,
    };
    this.http.login(userAccount).subscribe({
      next: (data) => {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          this.toastService.showSuccess('Login Successfully!', 2000);
          this.toastService.isLoading.next(true);
          this.router.navigate(['project']);
        }
      },
      error: () => {
        this.toastService.showErrors(
          'Username or password is not correct!',
          2000
        );
      },
    });
  }
}
