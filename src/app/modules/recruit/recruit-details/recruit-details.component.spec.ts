import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitDetailsComponent } from './recruit-details.component';

describe('RecruitDetailsComponent', () => {
  let component: RecruitDetailsComponent;
  let fixture: ComponentFixture<RecruitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
