import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeConfigurator } from './theme-configurator';

describe('ThemeConfigurator', () => {
  let component: ThemeConfigurator;
  let fixture: ComponentFixture<ThemeConfigurator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeConfigurator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeConfigurator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
