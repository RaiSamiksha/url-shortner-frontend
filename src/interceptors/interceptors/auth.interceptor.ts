import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {} // Inject CookieService

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.cookieService.get('authToken'); // Get token from cookie
    if (token) {
      console.log('Token found:', token);
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }
    console.log('No token found');
    return next.handle(req);
  }
}
