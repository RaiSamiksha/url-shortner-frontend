import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { MainComponent } from '../components/main/main.component';
import { SignupComponent } from '../components/signup/signup.component'; 
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


// Define your routes
export const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent, canActivate: [authGuard]},
];

export function authGuard() {
  const cookieService = inject(CookieService);  
  const token = cookieService.get('authToken');  
  
  if (token) {
    return true;  
  } else {
    return inject(Router).navigate(['/login']);  
  }
}
