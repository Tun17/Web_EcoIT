import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitAddComponent } from './recruit-add.component';

describe('RecruitAddComponent', () => {
  let component: RecruitAddComponent;
  let fixture: ComponentFixture<RecruitAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
