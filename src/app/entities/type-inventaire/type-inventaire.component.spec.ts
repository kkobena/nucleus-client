import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInventaireComponent } from './type-inventaire.component';

describe('TypeInventaireComponent', () => {
  let component: TypeInventaireComponent;
  let fixture: ComponentFixture<TypeInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
