import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss'
})
export class SubmitButtonComponent {
  @Input() text: string = 'Submit';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = true;
  @Input() variant: 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab' = 'raised';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() submitted = new EventEmitter<void>();

  onSubmit(): void {
    this.submitted.emit();
  }
}
