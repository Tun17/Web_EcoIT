import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusTypicalListComponent } from './cus-typical-list.component';

describe('CusTypicalListComponent', () => {
  let component: CusTypicalListComponent;
  let fixture: ComponentFixture<CusTypicalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusTypicalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusTypicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
