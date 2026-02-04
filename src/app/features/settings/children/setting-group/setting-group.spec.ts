import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingGroup } from './setting-group';

describe('SettingGroup', () => {
  let component: SettingGroup;
  let fixture: ComponentFixture<SettingGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
