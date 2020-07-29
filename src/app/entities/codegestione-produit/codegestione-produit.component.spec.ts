import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodegestioneProduitComponent } from './codegestione-produit.component';

describe('CodegestioneProduitComponent', () => {
  let component: CodegestioneProduitComponent;
  let fixture: ComponentFixture<CodegestioneProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodegestioneProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodegestioneProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
