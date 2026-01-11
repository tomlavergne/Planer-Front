import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocumentation } from './card-documentation';

describe('CardDocumentation', () => {
  let component: CardDocumentation;
  let fixture: ComponentFixture<CardDocumentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDocumentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDocumentation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
