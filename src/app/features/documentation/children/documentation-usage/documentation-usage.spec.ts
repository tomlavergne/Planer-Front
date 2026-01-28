import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationUsage } from './documentation-usage';

describe('DocumentationUsage', () => {
  let component: DocumentationUsage;
  let fixture: ComponentFixture<DocumentationUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationUsage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationUsage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
