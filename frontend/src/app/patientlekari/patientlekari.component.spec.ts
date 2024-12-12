import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlekariComponent } from './patientlekari.component';

describe('PatientlekariComponent', () => {
  let component: PatientlekariComponent;
  let fixture: ComponentFixture<PatientlekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientlekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientlekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
