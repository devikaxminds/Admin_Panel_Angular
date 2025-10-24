import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SubmitButtonComponent } from './submit-button.component';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

describe('SubmitButtonComponent', () => {
  let component: SubmitButtonComponent;
  let fixture: ComponentFixture<SubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitButtonComponent, CustomButtonComponent, MatButtonModule, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.text).toBe('Submit');
    expect(component.loading).toBe(false);
    expect(component.disabled).toBe(false);
    expect(component.fullWidth).toBe(true);
    expect(component.variant).toBe('raised');
    expect(component.color).toBe('primary');
    expect(component.size).toBe('medium');
  });

  it('should emit submitted event when onSubmit is called', () => {
    spyOn(component.submitted, 'emit');

    component.onSubmit();

    expect(component.submitted.emit).toHaveBeenCalled();
  });

  it('should pass correct props to custom button', () => {
    component.text = 'Save Changes';
    component.loading = true;
    component.disabled = true;
    component.fullWidth = false;
    component.variant = 'stroked';
    component.color = 'accent';
    component.size = 'large';
    
    fixture.detectChanges();

    const customButton = fixture.nativeElement.querySelector('app-custom-button');
    expect(customButton).toBeTruthy();
  });

  it('should render custom button component', () => {
    const customButtonElement = fixture.nativeElement.querySelector('app-custom-button');
    expect(customButtonElement).toBeTruthy();
  });
});
