import { Component, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy, AfterViewInit {
  @ViewChild('emailInput') emailInput!: ElementRef;
  // Form group for the login form
  loginForm!: FormGroup;
  // Track loading state during form submission
  isLoading = false;
  // Stores error messages to display to the user
  errorMessage = '';
  // Toggle password visibility
  showPassword = false;
  // Subsciption to the login request
  private loginSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize form with email, password, and remember me fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngAfterViewInit(): void {
    // Auto focus email field when componenet loads
    setTimeout(() => {
      this.emailInput.nativeElement.focus()
    })
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Error checking for invalid form
  showError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    // Show error if it is invalid and either dirty or touched
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Attempt to login using the auth service
      this.loginSubscription = this.authService.login(this.loginForm.value)
        .pipe(
          // Reset loading state after request completes
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          // On success, navigate to home page
          next: () => {
            this.router.navigate(['']);
          },
          // Error handling
          error: (error) => {
            if (error.status === 400 || error.staus === 401) {
              this.errorMessage = 'Invalid email or password';
            } else if (error.status === 0) {
              this.errorMessage = 'Unable to connect to the server. Please check your internet connection.';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            console.error('Login error:', error);
          }
        });
    } else {
      // If form is invalid, mark all fields as touched to trigger error displays
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Cleanup
  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
