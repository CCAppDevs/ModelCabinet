import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageComponent } from './project-page.component';
import { Project } from '../../Models/project';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { DataService } from '../../data.service';

class MockActivateRoute {
  public paramMap = of(convertToParamMap({id: 1}))
}

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;

  const mockProject: Project = {
    projectId: 1,
    name: 'Test Project',
    creationDate: new Date(),
    modifiedDate: new Date(),
    description: 'Test description',
    author: 'Author name',
    version: '1.0',
    assets: [],
    shortDescription: 'Short description',
    slug: 'test-project',
    projectTags: []
  };

  let mockDataService;
  let activatedMockRoute:MockActivateRoute = new MockActivateRoute();


  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj(['getProjectById']);
    mockDataService.getProjectById.and.returnValue('');
    activatedMockRoute = 

    await TestBed.configureTestingModule({
      declarations: [
        ProjectPageComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: activatedMockRoute
        },
        {
          provide: DataService, useValue: mockDataService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    component.project$ = new BehaviorSubject<Project>(mockProject);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
