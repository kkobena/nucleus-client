import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiersPayantComponent } from './tiers-payant.component';

describe('TiersPayantComponent', () => {
  let component: TiersPayantComponent;
  let fixture: ComponentFixture<TiersPayantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiersPayantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiersPayantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
