import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelComponent } from './custom-label.component';

describe('CustomLabelComponent', () => {
  let component: CustomLabelComponent;
  let fixture: ComponentFixture<CustomLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.text).toBe('');
    expect(component.required).toBe(false);
    expect(component.for).toBe('');
    expect(component.size).toBe('medium');
    expect(component.color).toBe('primary');
    expect(component.bold).toBe(false);
  });

  it('should display text when provided', () => {
    component.text = 'Test Label';
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent.trim()).toContain('Test Label');
  });

  it('should show required asterisk when required is true', () => {
    component.text = 'Required Field';
    component.required = true;
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('.custom-label__required');
    expect(requiredSpan).toBeTruthy();
    expect(requiredSpan.textContent).toBe('*');
  });

  it('should not show required asterisk when required is false', () => {
    component.text = 'Optional Field';
    component.required = false;
    fixture.detectChanges();

    const requiredSpan = fixture.nativeElement.querySelector('.custom-label__required');
    expect(requiredSpan).toBeFalsy();
  });

  it('should apply correct CSS classes based on size', () => {
    component.size = 'large';
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.classList).toContain('custom-label--large');
  });

  it('should apply correct CSS classes based on color', () => {
    component.color = 'warn';
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.classList).toContain('custom-label--warn');
  });

  it('should apply bold class when bold is true', () => {
    component.bold = true;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.classList).toContain('custom-label--bold');
  });
});
