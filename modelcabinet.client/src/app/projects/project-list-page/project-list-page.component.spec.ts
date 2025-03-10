import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListPageComponent } from './project-list-page.component';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from '../../data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

// Mock DataService
const mockDataService = {
  projects$: new BehaviorSubject([]), // Mimic BehaviorSubject for live updates
  getAllProjects: jasmine.createSpy('getAllProjects').and.callFake(() => {
    mockDataService.projects$.next([]); // Update BehaviorSubject, mimicking API call
  }),
};

describe('ProjectListPageComponent', () => {
  let component: ProjectListPageComponent;
  let fixture: ComponentFixture<ProjectListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectListPageComponent],
      providers: [
        provideHttpClient(), // New way to provide HttpClient in testing
        { provide: DataService, useValue: mockDataService } // Provide mock implementation
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignore unknown elements if needed
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
