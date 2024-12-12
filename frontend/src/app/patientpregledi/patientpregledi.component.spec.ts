import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientpreglediComponent } from './patientpregledi.component';

describe('PatientpreglediComponent', () => {
  let component: PatientpreglediComponent;
  let fixture: ComponentFixture<PatientpreglediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientpreglediComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientpreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
