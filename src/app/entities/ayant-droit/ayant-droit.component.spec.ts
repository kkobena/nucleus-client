import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyantDroitComponent } from './ayant-droit.component';

describe('AyantDroitComponent', () => {
  let component: AyantDroitComponent;
  let fixture: ComponentFixture<AyantDroitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyantDroitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyantDroitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
