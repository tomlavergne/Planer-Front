import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Text } from './text';

describe('Text', () => {
  let component: Text;
  let fixture: ComponentFixture<Text>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Text],
    }).compileComponents();

    fixture = TestBed.createComponent(Text);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default classes', () => {
    const element = fixture.nativeElement;
    expect(element.classList.contains('variant-body')).toBeTruthy();
    expect(element.classList.contains('align-left')).toBeTruthy();
    expect(element.classList.contains('as-p')).toBeTruthy();
  });

  it('should apply custom variant', () => {
    fixture.componentRef.setInput('variant', 'heading');
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.classList.contains('variant-heading')).toBeTruthy();
  });

  it('should apply size class when specified', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.classList.contains('size-lg')).toBeTruthy();
  });

  it('should apply truncate class', () => {
    fixture.componentRef.setInput('truncate', true);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.classList.contains('truncate')).toBeTruthy();
  });

  it('should set role="heading" for heading elements', () => {
    fixture.componentRef.setInput('as', 'h1');
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.getAttribute('role')).toBe('heading');
  });
});
