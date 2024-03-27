import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutControlComponent } from './about-control.component';

describe('AboutControlComponent', () => {
  let component: AboutControlComponent;
  let fixture: ComponentFixture<AboutControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
