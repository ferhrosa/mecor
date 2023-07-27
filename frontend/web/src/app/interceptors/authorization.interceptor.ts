import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if ([401, 403].includes(error.status)) {
      console.log(error);
      location.href = `${environment.cleanedApiBaseUrl}/Identity/Account/Login?ReturnUrl=${encodeURIComponent(location.href)}`;
      return of(error.message);
    }

    return throwError(error);
  }

}
