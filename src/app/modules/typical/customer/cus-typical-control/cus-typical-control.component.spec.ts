import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusTypicalControlComponent } from './cus-typical-control.component';

describe('CusTypicalControlComponent', () => {
  let component: CusTypicalControlComponent;
  let fixture: ComponentFixture<CusTypicalControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusTypicalControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusTypicalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
