import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryControlComponent } from './gallery-control.component';

describe('GalleryControlComponent', () => {
  let component: GalleryControlComponent;
  let fixture: ComponentFixture<GalleryControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
