import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponseModel } from '../models/response/login-response.model';
import { ClientSideHelpersService } from '../../services/common/client-side-helpers.service'
import { TokenPayloadModel } from '../models/token-payload.model';
import { AuthorizedUserModel } from '../models/authotrized-user.model'
import { ResponseModel, NoDataResponseModel } from '../../models/common/response.model'
import * as ApiConstants from '../../constants/api.constants'
import * as AuthConstants from '../constants/auth.constants'

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private clientSideHelpersService: ClientSideHelpersService) { }

  login(
    email: string,
    password: string): Observable<ResponseModel<LoginResponseModel>> {
    return this.http.post<ResponseModel<LoginResponseModel>>(
      ApiConstants.AUTH_API + '/login',
      {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if(response.isSuccess && response.data !== null) {
            localStorage.setItem(AuthConstants.ACCESS_TOKEN_KEY, response.data!.token);
          }
      }));
  }

  register(
    email: string,
    firstName: string,
    lastName: string,
    password: string): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(
      ApiConstants.AUTH_API + '/register',
      {
        email,
        firstName,
        lastName,
        password,
      });
  }

  resetPassword(
    email: string): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(
      ApiConstants.AUTH_API + '/reset-password',
      {
        email
      });
  }

  setPassword(
    email: string,
    password: string,
    resetToken: string): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(
      ApiConstants.AUTH_API + '/set-password',
      {
        email,
        password,
        code: resetToken
      });
  }

  confirmAccount(
    email: string,
    token: string): Observable<NoDataResponseModel> {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // Allow self-signed cert
        'Accept': '*/*',
      });

    return this.http.post<NoDataResponseModel>(
      ApiConstants.AUTH_API + '/confirm-user',
      {
        email,
        code: token
      }, { headers });
  }

  logout(): Observable<NoDataResponseModel> {
    const email = this.authorizedUser()?.email;

    return this.http.post<NoDataResponseModel>(ApiConstants.AUTH_API + '/logout', 
      {
        email
      })
      .pipe(
        tap(() => {
          localStorage.removeItem(AuthConstants.ACCESS_TOKEN_KEY);})
      );
  }  

  authorizedUser(): AuthorizedUserModel|null {
    const tokenPayload = this._tokenPayload(this.getToken());
    if(!tokenPayload){
      return null;
    }
    let authorizedUser = new AuthorizedUserModel
    if(tokenPayload?.email) {
      authorizedUser.email = tokenPayload.email;
    }
    if(tokenPayload?.name) {
      authorizedUser.name = tokenPayload.name;
    }

    return authorizedUser;
  }

  currentUserTokenExpired(): boolean {
    const tokenPayload = this._tokenPayload(this.getToken());
    if(tokenPayload?.exp) {
      const expirationTime = tokenPayload.exp;
      const currentTime = Math.floor(Date.now() / 1000);
  
      return expirationTime < currentTime;
    }

    return true;
  }

  getToken(): string | null {   
    if (this.clientSideHelpersService.isLocalStorageAvailable()) {
      return localStorage.getItem(AuthConstants.ACCESS_TOKEN_KEY);
    }

    return null;
  }

  private _tokenPayload(token: string|null): TokenPayloadModel|null {
    if (!token) {
      return null;
    }
  
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));

    let payloadModel = new TokenPayloadModel;
    payloadModel.name = payload[AuthConstants.CLAIMS_NAME_KEY]
    payloadModel.email = payload[AuthConstants.CLAIMS_EMAIL_KEY]
    payloadModel.exp = payload[AuthConstants.CLAIMS_EXP_KEY];

    return payloadModel;
  }
}