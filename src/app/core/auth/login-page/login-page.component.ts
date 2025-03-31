import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../services/api.service';

export interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
 loginForm: FormGroup;

  error: string | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit(){
    this.apiService.login(this.loginForm.value).subscribe({
      next: (token) => {
        console.log('Login successful, token:', token);
        localStorage.setItem('jwt', token);
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}
