import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLaboratoireComponent } from './form-laboratoire.component';

describe('FormLaboratoireComponent', () => {
  let component: FormLaboratoireComponent;
  let fixture: ComponentFixture<FormLaboratoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLaboratoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLaboratoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
