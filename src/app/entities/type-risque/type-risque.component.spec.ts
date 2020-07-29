import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRisqueComponent } from './type-risque.component';

describe('TypeRisqueComponent', () => {
  let component: TypeRisqueComponent;
  let fixture: ComponentFixture<TypeRisqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRisqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
