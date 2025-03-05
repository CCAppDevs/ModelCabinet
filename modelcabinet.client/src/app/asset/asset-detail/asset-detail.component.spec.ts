import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailComponent } from './asset-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FileSizePipe } from '../../Pipes/file-size.pipe';
import { DataService } from '../../data.service';

describe('AssetDetailComponent', () => {
  let component: AssetDetailComponent;
  let fixture: ComponentFixture<AssetDetailComponent>;

  const mockDataService = jasmine.createSpyObj(['getAllAssets']);

  beforeEach(async () => {
    

    await TestBed.configureTestingModule({
      declarations: [
        AssetDetailComponent,
        FileSizePipe,
      ],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();



    fixture = TestBed.createComponent(AssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
 
    expect(component).toBeTruthy();
  });

  it('should call DataService.getAllAssets()', () => {
    expect(mockDataService.getAllAssets).toHaveBeenCalled();
  
  });



  it('should have the correct title displayed in the template', () => {
  
    const title = "Toast";
    const element: HTMLElement = fixture.nativeElement;

    component.asset.name = title;
    fixture.detectChanges();

    const result = element.querySelector("h1")!;

    expect(result.textContent).toEqual(title);
  });
});
