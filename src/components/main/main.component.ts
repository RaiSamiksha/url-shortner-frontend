import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class MainComponent implements OnInit {
  urlForm: FormGroup;
  shortUrl: string | null = null;
  userUrls: { original: string; short: string; totalClicks: number; visitHistory: any[] }[] = [];
  displayedColumns: string[] = ['original', 'short', 'action'];  // Define table columns

  constructor(private fb: FormBuilder, private mainService: MainService, private router: Router) {
    this.urlForm = this.fb.group({
      longUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],  // Valid URL required
    });
  }

  ngOnInit(): void {
    this.getUserUrls();  // Fetch URLs on component load
  }

  // Method to get all user URLs
  getUserUrls(): void {
    this.mainService.getUserUrls().subscribe({
      next: (urlsResponse) => {
        this.userUrls = urlsResponse.map((url: any) => ({
          original: url.redirectUrl,
          short: `https://url-shortener-backend-sigma-blond.vercel.app/api/v1/url/redirect/${url.shortId}`,
          totalClicks: url.visitHistory.length,  // Get total clicks from the response
          visitHistory: url.visitHistory, // Store visit history
        }));
      },
      error: (err) => {
        console.error('Error fetching user URLs:', err);
      }
    });
  }

  // Method for generating short URL
  onSubmit(): void {
    if (this.urlForm.valid) {
      const longUrl = this.urlForm.value.longUrl;
      this.mainService.generateShortUrl(longUrl).subscribe({
        next: (response: any) => {
          this.shortUrl = `https://url-shortener-backend-sigma-blond.vercel.app/api/v1/url/redirect/${response.shortId}`;
          this.getUserUrls();  // Refresh the list after generating a new URL
        },
        error: (err) => {
          console.error('Error generating short URL:', err);
        }
      });
    }
  }

  // Method to copy short URL to clipboard
  copyToClipboard(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      alert('Short URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy the URL:', err);
    });
  }

  // Method to log out
  onLogout() {
    this.clearAuthCookies();
    this.router.navigate(['/login']);
  }

  // Clear authentication token
  clearAuthCookies() {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}