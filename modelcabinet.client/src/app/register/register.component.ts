import { Component, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy, AfterViewInit {
  @ViewChild('displayNameInput') displayNameInput!: ElementRef;

  // Form group for the registration form
  registerForm!: FormGroup;

  // Track loading state during form submission
  isLoading = false;

  // Stores error messages to display to the user
  errorMessage = '';

  // Toggle password visibility
  showPassword = false;
  showConfirmPassword = false;

  // Subscription to the registration request
  private registerSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    // Auto focus display name field when component loads
    setTimeout(() => {
      this.displayNameInput?.nativeElement.focus();
    });
  }

  // Initialize registration form with validation
  private initializeForm(): void {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]],
      confirmPassword: ['', [Validators.required]],
      biography: [''],
      location: [''],
      website: [''],
      githubUsername: [''],
      twitterHandle: ['']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to ensure passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matching: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Error checking for invalid form
  showError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Create register DTO from form values
      const registerData = {
        displayName: this.registerForm.value.displayName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
        biography: this.registerForm.value.biography || undefined,
        location: this.registerForm.value.location || undefined,
        website: this.registerForm.value.website || undefined,
        githubUsername: this.registerForm.value.githubUsername || undefined,
        twitterHandle: this.registerForm.value.twitterHandle || undefined
      };

      // Attempt to register using the auth service
      this.registerSubscription = this.authService.register(registerData)
        .pipe(
          // Reset loading state after request completes
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          // On success, navigate to home page
          next: () => {
            this.router.navigate(['/']);
          },
          // Error handling
          error: (error) => {
            if (error.status === 400) {
              // Handle validation errors from the server
              if (error.error && typeof error.error === 'object') {
                const errorMessages = [];

                // Extract error messages from the response
                for (const key in error.error) {
                  if (Array.isArray(error.error[key])) {
                    errorMessages.push(...error.error[key]);
                  } else if (typeof error.error[key] === 'string') {
                    errorMessages.push(error.error[key]);
                  }
                }

                this.errorMessage = errorMessages.join(' ');
              } else {
                this.errorMessage = 'Registration failed. Please check your information and try again.';
              }
            } else if (error.status === 0) {
              this.errorMessage = 'Unable to connect to the server. Please check your internet connection.';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            console.error('Registration error:', error);
          }
        });
    } else {
      // If form is invalid, mark all fields as touched to trigger error displays
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Cleanup
  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
