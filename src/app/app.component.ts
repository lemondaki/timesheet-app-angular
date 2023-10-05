import { Component, OnInit } from '@angular/core';
import { toastService } from './core/services/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'ok';
  isLoading: boolean = false;
  constructor(private toastService: toastService) {}
  ngOnInit(): void {
    this.toastService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    });
  }
}
