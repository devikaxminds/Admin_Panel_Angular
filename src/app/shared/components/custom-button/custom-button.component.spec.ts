import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CustomButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonComponent, MatButtonModule, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when onClick is called and button is not disabled or loading', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = false;
    component.loading = false;

    component.onClick();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when button is disabled', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = true;
    component.loading = false;

    component.onClick();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when button is loading', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = false;
    component.loading = true;

    component.onClick();

    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should have default values', () => {
    expect(component.text).toBe('');
    expect(component.type).toBe('button');
    expect(component.variant).toBe('raised');
    expect(component.color).toBe('primary');
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.fullWidth).toBe(false);
    expect(component.size).toBe('medium');
  });
});
