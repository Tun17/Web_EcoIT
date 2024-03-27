import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusTypicalHomeComponent } from './cus-typical-home.component';

describe('CusTypicalHomeComponent', () => {
  let component: CusTypicalHomeComponent;
  let fixture: ComponentFixture<CusTypicalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusTypicalHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusTypicalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
