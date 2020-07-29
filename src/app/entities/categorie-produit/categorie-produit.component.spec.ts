import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieProduitComponent } from './categorie-produit.component';

describe('CategorieProduitComponent', () => {
  let component: CategorieProduitComponent;
  let fixture: ComponentFixture<CategorieProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
