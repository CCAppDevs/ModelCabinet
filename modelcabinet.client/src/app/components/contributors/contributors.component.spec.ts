import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributorsComponent } from './contributors.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ContributorsComponent', () => {
  let component: ContributorsComponent;
  let fixture: ComponentFixture<ContributorsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContributorsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContributorsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);


    fixture.detectChanges(); // Triggers ngOnInit() and its API call

    // Intercept the initial API request triggered by ngOnInit()
    httpTestingController.expectOne('https://api.github.com/repos/CCAppDevs/ModelCabinet/contributors')
      .flush([]); // Respond with an empty array to resolve the request
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no unhandled requests remain
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch contributors', () => {
    const expectedData = [{ login: 'user1', avatar_url: 'url1', html_url: 'html1' }];

    // Trigger the request manually if needed
    component.ngOnInit();
    fixture.detectChanges();

    // Capture the request made by ngOnInit()
    const req = httpTestingController.expectOne('https://api.github.com/repos/CCAppDevs/ModelCabinet/contributors');
    expect(req.request.method).toEqual('GET');

    // Respond with mock data
    req.flush(expectedData);

    // Assert that the component received the expected data
    expect(component.contributors).toEqual(expectedData);
  });
});
