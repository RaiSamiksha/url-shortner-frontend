import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiUrl = 'https://url-shortener-backend-sigma-blond.vercel.app/api/v1/url'; // Your backend base URL

  constructor(private http: HttpClient) {}

  generateShortUrl(longUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/shorten`, { longUrl }, { withCredentials: true });
  }
  
  getUserUrls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-urls`, { withCredentials: true });
  }
  
  getOriginalUrl(shortId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/redirect/${shortId}`, { withCredentials: true });
  }
}
