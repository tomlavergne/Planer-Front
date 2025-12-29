import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spacer } from './spacer';

describe('Spacer', () => {
  let component: Spacer;
  let fixture: ComponentFixture<Spacer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spacer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spacer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
