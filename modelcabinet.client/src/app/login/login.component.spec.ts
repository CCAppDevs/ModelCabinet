import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { UserDto } from '../Interfaces/user-dto';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';

class MockAuthService {
  login: Observable<UserDto> = of({
    id: "",
    email: "",
    displayName: "",
    biography: "",
    location: "",
    website: "",
    avatarUrl: "",
    twitterHandle: "",
    githubUsername: "",
    preferredLanguage: "",
    timeZone: "",
    dateJoined: new Date(),
    lastActive: new Date(),
    isProfilePublic: false,
    emailNotificationsEnabled: false,
    projectUpdatesEnabled: false,
    newMessageNotificationsEnabled: false,
  });
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuthService: MockAuthService = new MockAuthService();
  const mockFormBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: FormBuilder,
          useValue: mockFormBuilder
        },
        provideRouter([{ path: '', component: LandingPageComponent }]),
      ],
      declarations: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

