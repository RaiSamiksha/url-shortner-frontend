import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';  // Import CookieService

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://url-shortener-backend-sigma-blond.vercel.app/api/v1/users'; // Your backend base URL

  constructor(private http: HttpClient, private cookieService: CookieService) {}  // Inject CookieService

  // User login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
