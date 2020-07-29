import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModePaiementComponent } from './mode-paiement.component';

describe('ModePaiementComponent', () => {
  let component: ModePaiementComponent;
  let fixture: ComponentFixture<ModePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
