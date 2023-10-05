import { Component, OnInit } from '@angular/core';
import { toastService } from 'src/app/core/services/toast.service';
import { authService } from 'src/app/modules/auth/service/auth.service';
import { Router } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { map } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  emailAddress: string = '';
  userName: string = '';
  avatarFullPath: string = '';
  type = 'side';
  routes = [
    { path: '/', icon: 'home', name: 'Home page' },
    { path: '/project', icon: 'assessment', name: 'Projects' },
  ];
  isHandset: boolean = false;
  handleLogout() {
    localStorage.removeItem('accessToken');
    this.toastService.isLoading.next(true);
    this.router.navigate(['login']);
    this.toastService.showSuccess('Logout successfully!', 2000);
  }
  constructor(
    private router: Router,
    private toastService: toastService,
    private authService: authService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        '(max-width: 1186px)', // add custom breakpoint
      ])
      .pipe(map((state: BreakpointState) => state.matches))
      .subscribe((isCheck) => {
        this.isHandset = isCheck;
      });
  }

  ngOnInit(): void {
    this.authService.getUserInfor().subscribe(({ result }) => {
      const { userName, emailAddress, avatarFullPath } = result.user;
      this.userName = userName;
      this.emailAddress = emailAddress;
      this.avatarFullPath = avatarFullPath;
    });
  }
}
