import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { authService } from 'src/app/modules/auth/service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private authService: authService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //how to update the request Parameters
    const accessToken = this.authService.getAccessTokenLocalStorage;
    const updatedRequest = request.clone({
      headers: request.headers.set('Authorization', 'bearer ' + accessToken),
    });
    return next.handle(updatedRequest);
  }
}
