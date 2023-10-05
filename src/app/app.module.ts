import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './core/interceptors/app-http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastNotificationComponent } from './shared/components/toast-notification/toast-notification.component';
import { AuthModule } from './modules/auth/auth.module';
import { LayoutModule } from './shared/layout/layout.module';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared/shared.module';
@NgModule({
  declarations: [AppComponent, ToastNotificationComponent, DialogComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
