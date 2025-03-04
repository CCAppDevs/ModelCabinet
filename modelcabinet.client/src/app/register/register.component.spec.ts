import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AuthService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.registerForm.value).toEqual({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      biography: '',
      location: '',
      website: '',
      githubUsername: '',
      twitterHandle: ''
    });
  });

  it('should validate required fields', () => {
    const form = component.registerForm;

    // Initially form should be invalid
    expect(form.valid).toBeFalsy();

    // Set valid values for required fields
    form.patchValue({
      displayName: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });

    expect(form.valid).toBeTruthy();
  });

  it('should validate password match', () => {
    const form = component.registerForm;

    form.patchValue({
      displayName: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'DifferentPassword123!',
      termsAndConditions: true
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('confirmPassword')?.errors?.['matching']).toBeTruthy();

    // Fix the password match
    form.patchValue({
      confirmPassword: 'Password123!'
    });

    expect(form.valid).toBeTruthy();
  });

  it('should validate password complexity', () => {
    const form = component.registerForm;
    const passwordControl = form.get('password');

    passwordControl?.setValue('simple');
    expect(passwordControl?.valid).toBeFalsy();

    passwordControl?.setValue('Password123!');
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });
});
