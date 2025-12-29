import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPopoverContent } from './user-popover-content';

describe('UserPopoverContent', () => {
  let component: UserPopoverContent;
  let fixture: ComponentFixture<UserPopoverContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPopoverContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPopoverContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
