import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel, NoDataResponseModel } from '../../models/common/response.model';
import { UserProfileModel } from '../../models/users/user-profile.model';
import * as ApiConstants from '../../constants/api.constants'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserProfilesService {

  constructor(private http: HttpClient) { }

  get(): Observable<ResponseModel<UserProfileModel>> {
    console.log(ApiConstants.AUTH_API)
    return this.http.get<ResponseModel<UserProfileModel>>(
      ApiConstants.AUTH_API + '/user-profile', httpOptions);
  }

  update(
    formData: FormData
  ): Observable<ResponseModel<UserProfileModel>> {
    return this.http.put<ResponseModel<UserProfileModel>>(
      ApiConstants.AUTH_API + '/user-profile', 
      formData);
  }

  resetImage(): Observable<ResponseModel<UserProfileModel>> {
    return this.http.put<ResponseModel<UserProfileModel>>(
      ApiConstants.AUTH_API + '/user-profile/reset-image', httpOptions);
  }

  deactivate(): Observable<NoDataResponseModel> {
    return this.http.post<NoDataResponseModel>(
      ApiConstants.AUTH_API + '/user-profile/deactivate', httpOptions);
  }
}