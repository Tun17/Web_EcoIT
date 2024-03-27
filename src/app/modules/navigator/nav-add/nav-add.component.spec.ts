import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAddComponent } from './nav-add.component';

describe('NavAddComponent', () => {
  let component: NavAddComponent;
  let fixture: ComponentFixture<NavAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
