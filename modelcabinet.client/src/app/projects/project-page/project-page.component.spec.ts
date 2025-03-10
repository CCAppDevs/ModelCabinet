import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectPageComponent } from './project-page.component';
import { Project } from '../../Models/project';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { DataService } from '../../data.service';
import { Component, Input } from '@angular/core';
import { Asset } from '../../Models/asset';

  @Component({
    selector: 'app-asset-detail',
    template: '<div></div>'
  })
class MockAssetDetailComponent {
  @Input() asset!: Asset;  // Simulate the real component's input
}
// Mock app-viewport component
@Component({
  selector: 'app-viewport',
  template: '<div></div>'
})
class MockViewportComponent {
  @Input() stlModels: Asset[] = [];  // Mock real component's input
}

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
    assets: [
      {
        assetId: 1,
        name: "Sample Asset",
        path: '/assets/sample.png',
        dateCreation: new Date(),
        dateUpdated: new Date(),
        fileSize: 12345,
        projectId: 1,
        assetTags: []
      }
    ],
    shortDescription: 'Short description',
    slug: 'test-project',
    projectTags: []

  };

  let mockDataService: jasmine.SpyObj<DataService>;
  const activatedMockRoute = new MockActivateRoute();


  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj<DataService>('DataService', ['getProjectById']);
    // Simulate BehaviorSubject update like real service
    mockDataService.getProjectById.and.callFake(() => {
      mockDataService.project$.next(mockProject);
    });
    await TestBed.configureTestingModule({
      declarations: [
        ProjectPageComponent,
        MockViewportComponent, // Declare mock component
        MockAssetDetailComponent // Mocked asset-detail component
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
