import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ripple } from './ripple';

describe('Ripple', () => {
  let component: Ripple;
  let fixture: ComponentFixture<Ripple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ripple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ripple);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
