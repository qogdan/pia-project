import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorraznoComponent } from './doctorrazno.component';

describe('DoctorraznoComponent', () => {
  let component: DoctorraznoComponent;
  let fixture: ComponentFixture<DoctorraznoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorraznoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorraznoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
