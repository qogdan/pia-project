import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientobavestenjaComponent } from './patientobavestenja.component';

describe('PatientobavestenjaComponent', () => {
  let component: PatientobavestenjaComponent;
  let fixture: ComponentFixture<PatientobavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientobavestenjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientobavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
