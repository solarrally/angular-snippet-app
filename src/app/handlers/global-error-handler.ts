import { ErrorHandler, Injectable } from '@angular/core';
import { AlertService } from '../services/common/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NoDataResponseModel } from '../models/common/response.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor(
    private router: Router) { }  

  handleError(error: any): void {
    let errorText: string = '';
    if(error instanceof HttpErrorResponse) {
      let httpErrorResponse = (error as HttpErrorResponse);
      let responseAsNoDataResponseModel = ((httpErrorResponse)?.error as NoDataResponseModel);

      if(responseAsNoDataResponseModel != null && responseAsNoDataResponseModel.message)  {
        errorText = responseAsNoDataResponseModel.message ?? '';
      } else {
        errorText = httpErrorResponse?.message;
      }
    } 
    else {
      errorText = error;
    }

    this.logErrorToServer(errorText, error);
    this.router.navigate(['/errors']);
  }

  //TODO: add logging service
  private logErrorToServer(message: string, error: any): void {
    console.error(message)    
    console.error(error)
  }
}