import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContributorsComponent } from './contributors.component';

describe('ContributorsComponent', () => {
  let component: ContributorsComponent;
  let fixture: ComponentFixture<ContributorsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContributorsComponent],
      imports: [HttpClientTestingModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(ContributorsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); 
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch contributors', () => {
    const expectedData = [{ login: 'user1', avatar_url: 'url1', html_url: 'html1' }];
    component.ngOnInit();
    const req = httpTestingController.expectOne('https://api.github.com/repos/CCAppDevs/ModelCabinet/contributors');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData); 

    expect(component.contributors).toEqual(expectedData);
  });
});
