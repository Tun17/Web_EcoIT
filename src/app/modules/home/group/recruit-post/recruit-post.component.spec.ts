import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitPostComponent } from './recruit-post.component';

describe('RecruitPostComponent', () => {
  let component: RecruitPostComponent;
  let fixture: ComponentFixture<RecruitPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
