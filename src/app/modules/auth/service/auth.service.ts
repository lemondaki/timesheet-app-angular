import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IAuthResponse, IUserAccount } from '../interface/auth.interface';
import { ITokenResponse } from '../interface/auth.interface';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class authService {
  private AUTH_URL = `${environment.baseUrl}TokenAuth/Authenticate`;
  constructor(private http: HttpClient) {}
  get getAccessTokenLocalStorage() {
    return localStorage.getItem('accessToken');
  }

  login(userAccount: IUserAccount): Observable<ITokenResponse> {
    return this.http.post<IAuthResponse>(this.AUTH_URL, userAccount).pipe(
      map((response: IAuthResponse) => {
        return {
          accessToken: response.result.accessToken,
          encryptedAccessToken: response.result.encryptedAccessToken,
          expireInSeconds: response.result.expireInSeconds,
          userId: response.result.userId,
        };
      })
    );
  }

  getUserInfor(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}services/app/Session/GetCurrentLoginInformations`
    );
  }
}
