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
  styleUrl: './query-form.component.scss',
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
