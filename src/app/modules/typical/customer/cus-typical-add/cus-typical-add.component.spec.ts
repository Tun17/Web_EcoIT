import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusTypicalAddComponent } from './cus-typical-add.component';

describe('CusTypicalAddComponent', () => {
  let component: CusTypicalAddComponent;
  let fixture: ComponentFixture<CusTypicalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusTypicalAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusTypicalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
