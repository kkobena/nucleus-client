import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoireProduitComponent } from './laboratoire-produit.component';

describe('LaboratoireProduitComponent', () => {
  let component: LaboratoireProduitComponent;
  let fixture: ComponentFixture<LaboratoireProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoireProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoireProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
