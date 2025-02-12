import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutModelCabinetComponent } from './About-ModelCabinet.component';

describe('AboutModelCabinetComponent', () => {
  let component: AboutModelCabinetComponent;
  let fixture: ComponentFixture<AboutModelCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutModelCabinetComponent]
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
