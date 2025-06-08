import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  loginForm!: FormGroup;
  userData: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.initLoginForm();
  }

  initLoginForm() {
    return this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    //const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.getUserByEmail(this.loginForm.value.email).subscribe((res:any) =>{
        this.userData = res[0];
        console.log(this.userData);
        if(this.userData.password === this.loginForm.value.password){
          if(this.userData.isActive){
            sessionStorage.setItem('currentUser', JSON.stringify(this.userData));
            this.router.navigate(['/home']);
          }
          else{
            alert('Your account is deactivated. Please contact admin.');
          }
        }
        else{
          alert('Invalid email or password');
        }
      })
  }
}
}
