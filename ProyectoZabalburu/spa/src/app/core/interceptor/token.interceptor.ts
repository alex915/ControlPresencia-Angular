import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../../Services/auth.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public authService: AuthenticationService) { }
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.acquireToken())
              .pipe(
                switchMap(token => {
                   const headers = request.headers
                            .set('Authorization', 'Bearer ' + token)
                            .append('Content-Type', 'application/json');
                   const requestClone = request.clone({
                     headers 
                    });
                  return next.handle(requestClone);
                })
               );
    }
}
