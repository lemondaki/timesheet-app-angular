import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { authService } from 'src/app/modules/auth/service/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private http: authService, private router: Router) {}
  canActivate(): boolean {
    if (this.http.getAccessTokenLocalStorage) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
