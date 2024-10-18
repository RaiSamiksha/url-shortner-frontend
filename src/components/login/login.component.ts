import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';  
import { Router } from '@angular/router';  
import { CookieService } from 'ngx-cookie-service';  // Import CookieService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private router: Router,
    private cookieService: CookieService // Inject CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.loginService.login(credentials).subscribe({
        next: (response: any) => {
          console.log('Login response:', response);  // Debug the response
          const token = response.token;
          if (token) {
            this.cookieService.set('authToken', token);  // Store token in a cookie
            console.log('Token stored in cookie:', token);
            console.log('Redirecting to main component');
  
            // Redirect to the main component and let main component fetch URLs
            this.router.navigate(['/main']);  
  
          } else {
            this.loginError = 'Login failed. No token received.';
          }
        },
        error: (error) => {
          this.loginError = 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }
  
}
