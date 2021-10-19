import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';

  constructor(private userService: UsersService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.token.pipe(
      mergeMap((token) => {
        if (!token) {
          return next.handle(request);
        }
        const bearerToken = `Bearer ${token}`;
        request = request.clone({
          headers: request.headers.set(this.AUTH_HEADER, bearerToken),
        });
        return next.handle(request);
      })
    );
  }

  get token() {
    return from([this.userService.token ?? false]);
  }
}
