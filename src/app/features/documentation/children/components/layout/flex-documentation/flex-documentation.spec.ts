import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexDocumentation } from './flex-documentation';

describe('FlexDocumentation', () => {
  let component: FlexDocumentation;
  let fixture: ComponentFixture<FlexDocumentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexDocumentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexDocumentation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
