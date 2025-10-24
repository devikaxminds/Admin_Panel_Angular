import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-label.component.html',
  styleUrl: './custom-label.component.scss'
})
export class CustomLabelComponent {
  @Input() text: string = '';
  @Input() required: boolean = false;
  @Input() for: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'secondary' | 'accent' | 'warn' = 'primary';
  @Input() bold: boolean = false;
}
