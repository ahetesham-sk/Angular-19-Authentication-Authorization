import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.initRegistrationForm();
  }

  initRegistrationForm() {
    return this.fb.group({
      id: [''],
      name: [''],
      password: [''],
      email: [''],
      gender: [''],
      role: [''],
      isActive: [false]
    });
  }

  onSubmit() {
    this.registrationForm.patchValue({
      id: this.authService.generateRandomUserId()
    })
    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          // Handle error appropriately, e.g., show a message to the user
        }
      });
    }
    //this.router.navigate(['/login']);
  }
}
