import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../services/api.service';
import { Router } from '@angular/router';


export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
}

@Component({
  selector: 'app-registration-page',
  imports: [ FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  registrationForm: FormGroup;

  error: string | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      roleId: [0],
    });
  }

  onSubmit(){
    this.apiService.registerUser(this.registrationForm.value);
  }
}
