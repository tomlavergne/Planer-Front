import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toaststack } from './toaststack';

describe('Toaststack', () => {
  let component: Toaststack;
  let fixture: ComponentFixture<Toaststack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toaststack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toaststack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
