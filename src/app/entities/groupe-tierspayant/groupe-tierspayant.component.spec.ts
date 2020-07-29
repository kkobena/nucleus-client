import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeTierspayantComponent } from './groupe-tierspayant.component';

describe('GroupeTierspayantComponent', () => {
  let component: GroupeTierspayantComponent;
  let fixture: ComponentFixture<GroupeTierspayantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeTierspayantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeTierspayantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
