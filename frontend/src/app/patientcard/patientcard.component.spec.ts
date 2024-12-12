import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientcardComponent } from './patientcard.component';

describe('PatientcardComponent', () => {
  let component: PatientcardComponent;
  let fixture: ComponentFixture<PatientcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
