import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitControlComponent } from './recruit-control.component';

describe('RecruitControlComponent', () => {
  let component: RecruitControlComponent;
  let fixture: ComponentFixture<RecruitControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
