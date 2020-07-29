import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEtiquetteComponent } from './type-etiquette.component';

describe('TypeEtiquetteComponent', () => {
  let component: TypeEtiquetteComponent;
  let fixture: ComponentFixture<TypeEtiquetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEtiquetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEtiquetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
