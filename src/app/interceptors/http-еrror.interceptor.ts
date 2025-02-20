import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError(err => {
      if (err.status === 0) {
        console.error('An error occurred on the client:', err.error);
      } else {
        console.error(
          `Backend returned code ${err.status}, body was: `, err.error);
      }
      return next(req);
    })
  )
};