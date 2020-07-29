import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMvtCaisseComponent } from './type-mvt-caisse.component';

describe('TypeMvtCaisseComponent', () => {
  let component: TypeMvtCaisseComponent;
  let fixture: ComponentFixture<TypeMvtCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMvtCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMvtCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
