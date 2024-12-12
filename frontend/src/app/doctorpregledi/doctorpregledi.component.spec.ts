import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorpreglediComponent } from './doctorpregledi.component';

describe('DoctorpreglediComponent', () => {
  let component: DoctorpreglediComponent;
  let fixture: ComponentFixture<DoctorpreglediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorpreglediComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorpreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
