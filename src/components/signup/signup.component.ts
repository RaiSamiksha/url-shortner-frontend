import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,  // Add MatCardModule for mat-card
  ],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private signupService: SignupService, 
    private router: Router  // Inject Router here
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field
      confirmPassword: ['', [Validators.required]], // Confirm password field
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      // Check if password and confirm password match
      if (formData.password !== formData.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;

      // Use the service to send the form data to the backend
      this.signupService.signup({ email: formData.email, password: formData.password })
        .subscribe({
          next: (response: any) => {
            console.log('Signup successful', response);

            // Navigate to the login page after successful signup
            this.router.navigate(['/login']);
          },
          error: (error: any) => {
            console.error('Signup error', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
