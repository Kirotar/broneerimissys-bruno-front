import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './query-form.component.html',
  //styleUrl: './query-form.component.scss',
  styles: [`
    mat-dialog-content {
      min-width: 300px;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    mat-form-field {
      width: 100%;
    }

    .number-buttons {
      display: flex;
      align-items: center;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    mat-checkbox {
      margin-top: 8px;
      margin-bottom: 16px;
    }

    .success-message {
      text-align: center;
      padding: 24px 16px;
    }

    .success-message p {
      margin: 16px 0;
      font-size: 16px;
      line-height: 1.5;
    }

    .success-message p:first-child {
      font-weight: 500;
      font-size: 18px;
      color: #F4633A;
    }

    mat-dialog-actions {
      padding: 16px 0;
    }

    button:not(:last-child) {
      margin-right: 8px;
    }
  `]
})
export class QueryFormComponent {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    public dialogRef: MatDialogRef<QueryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      organisation: ['', Validators.required],
      date: [new Date(), Validators.required],
      numberOfPeople: [1, [Validators.required, Validators.min(0)]],
      message: [''],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  incrementPeople() {
    const currentValue = this.form.get('numberOfPeople')?.value || 0;
    this.form.get('numberOfPeople')?.setValue(currentValue + 1);
  }

  decrementPeople() {
    const currentValue = this.form.get('numberOfPeople')?.value || 0;
    if (currentValue > 0) {
      this.form.get('numberOfPeople')?.setValue(currentValue - 1);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitted = true;
    }
  }
}
