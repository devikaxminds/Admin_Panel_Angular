import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { CustomLabelComponent } from '../../shared/components/custom-label/custom-label.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    CustomButtonComponent,
    CustomLabelComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    console.log('Submit button clicked');
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form value:', this.loginForm.value);
    console.log('Loading state:', this.loading);
    
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      const formData = this.loginForm.value;

      console.log('Making login request with:', {
        username: formData.username,
        password: formData.password,
        device_token: ["string"]
      });

      this.authService.login({
        username: formData.username,
        password: formData.password,
        device_token: ["string"]
      }).subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Login error:', error);
          console.error('Error status:', error.status);
          console.error('Error body:', error.error);
          console.error('Error message from server:', error.error?.message);
          console.error('Full error object:', JSON.stringify(error.error, null, 2));
          const errorMessage = error.error?.message || 'Login failed. Please try again.';
          console.error('Error message displayed to user:', errorMessage);
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    for (const key of Object.keys(this.loginForm.controls)) {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${fieldName} must be at least 6 characters`;
    }
    return '';
  }

  togglePasswordVisibility(): void {
    console.log('Password visibility toggle clicked, current state:', this.hidePassword);
    this.hidePassword = !this.hidePassword;
    console.log('New state:', this.hidePassword);
  }
}
