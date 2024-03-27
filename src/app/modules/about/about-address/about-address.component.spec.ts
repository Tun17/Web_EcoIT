import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAddressComponent } from './about-address.component';

describe('AboutAddressComponent', () => {
  let component: AboutAddressComponent;
  let fixture: ComponentFixture<AboutAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
