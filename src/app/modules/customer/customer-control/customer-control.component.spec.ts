import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerControlComponent } from './customer-control.component';

describe('CustomerControlComponent', () => {
  let component: CustomerControlComponent;
  let fixture: ComponentFixture<CustomerControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
