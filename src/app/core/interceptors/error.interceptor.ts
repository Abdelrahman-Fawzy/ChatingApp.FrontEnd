import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from '../services/toastr.service';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err) {
          switch (err.status) {
            case 401:
              this.toastr.error('ليس لديك صلاحية');
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 400:
              if (err.error.errors) {
                const modelStateErrors = [];
                for (const key in err.error.errors) {
                  modelStateErrors.push(err.error.errors[key]);
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error('طلبك غير صحيح');
              }
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: err.error },
              };
              console.log(navigationExtras);

              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('حدث خطأ ما');
              break;
          }
        }

        return throwError(() => err);
      }),
    );
  }
}
