import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { Otp } from './otp';

describe('Otp', () => {
  let component: Otp;
  let fixture: ComponentFixture<Otp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Otp],
    }).compileComponents();

    fixture = TestBed.createComponent(Otp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty values', () => {
    expect(component.values()).toEqual(['', '', '', '', '', '']);
    expect(component.value()).toBe('');
  });

  it('should update value when individual field changes', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      value: { value: '5' },
      writable: false,
    });

    component.onInput(0, event);
    fixture.detectChanges();

    expect(component.values()[0]).toBe('5');
  });

  it('should only accept numbers when numbersOnly is true', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      value: { value: 'a5' },
      writable: true,
    });

    component.onInput(0, event);
    expect(component.values()[0]).toBe('5');
  });

  it('should accept alphanumeric when numbersOnly is false', () => {
    fixture.componentRef.setInput('numbersOnly', false);
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      value: { value: 'A' },
      writable: true,
    });

    component.onInput(0, event);
    expect(component.values()[0]).toBe('A');
  });

  it('should handle backspace navigation', () => {
    component.values.set(['1', '2', '3', '4', '5', '6']);
    const focusSpy = spyOn(component, 'focusInput');

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    Object.defineProperty(event, 'target', {
      value: { value: '' },
      writable: false,
    });

    component.onKeyDown(3, event);
    expect(focusSpy).toHaveBeenCalledWith(2);
  });

  it('should handle arrow key navigation', () => {
    const focusSpy = spyOn(component, 'focusInput');

    // Arrow right
    let event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeyDown(2, event);
    expect(focusSpy).toHaveBeenCalledWith(3);

    // Arrow left
    event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    component.onKeyDown(2, event);
    expect(focusSpy).toHaveBeenCalledWith(1);
  });

  it('should handle paste operation', () => {
    const clipboardData = {
      getData: (type: string) => '123456',
    };

    const event = new ClipboardEvent('paste', {
      clipboardData: clipboardData as any,
    });

    component.onPaste(0, event);
    fixture.detectChanges();

    expect(component.values()).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(component.value()).toBe('123456');
  });

  it('should validate required field', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const isValid = component.validate();
    expect(isValid).toBe(false);
    expect(component.errorMessage()).toBeTruthy();

    component.value.set('123456');
    const isValidAfter = component.validate();
    expect(isValidAfter).toBe(true);
  });

  it('should reset to initial state', () => {
    component.values.set(['1', '2', '3', '4', '5', '6']);
    component.value.set('123456');

    component.reset();

    expect(component.values()).toEqual(['', '', '', '', '', '']);
    expect(component.value()).toBe('');
    expect(component.isTouched()).toBe(false);
    expect(component.isDirty()).toBe(false);
  });

  it('should display separator at correct position', () => {
    expect(component.shouldShowSeparator(2)).toBe(true);
    expect(component.shouldShowSeparator(0)).toBe(false);
    expect(component.shouldShowSeparator(5)).toBe(false);
  });

  it('should hide separator when separatorIndex is null', () => {
    fixture.componentRef.setInput('separatorIndex', null);
    fixture.detectChanges();

    expect(component.shouldShowSeparator(2)).toBe(false);
  });

  it('should handle different lengths', () => {
    fixture.componentRef.setInput('length', 4);
    fixture.detectChanges();

    expect(component.values().length).toBe(4);
    expect(component.indices().length).toBe(4);
  });

  it('should distribute initial value across fields', () => {
    fixture.componentRef.setInput('value', '1234');
    fixture.detectChanges();

    expect(component.values()).toEqual(['1', '2', '3', '4', '', '']);
  });
});
