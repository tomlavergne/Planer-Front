import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDocumentation } from './grid-documentation';

describe('GridDocumentation', () => {
  let component: GridDocumentation;
  let fixture: ComponentFixture<GridDocumentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridDocumentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDocumentation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
