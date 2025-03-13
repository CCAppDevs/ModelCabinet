import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutModelCabinetComponent } from './about-modelcabinet.component';
import { ContributorsComponent } from '../components/contributors/contributors.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AboutModelCabinetComponent', () => {
  let component: AboutModelCabinetComponent;
  let fixture: ComponentFixture<AboutModelCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AboutModelCabinetComponent,
        ContributorsComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutModelCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
