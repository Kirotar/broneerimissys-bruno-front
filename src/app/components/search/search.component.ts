import {Component} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Observable, BehaviorSubject, switchMap, finalize, of} from 'rxjs';
import {Room, RoomSearch, SearchService} from './search.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', '../../../styles.scss']
})
export class SearchComponent {
  isVisible = false;
  roomSearchForm: FormGroup;
  private searchSubject = new BehaviorSubject<RoomSearch | null>(null);

  rooms$: Observable<Room[]>;
  isLoading = false;
  error: string | null = null;

  constructor(private searchService: SearchService, private fb: FormBuilder) {
    this.roomSearchForm = this.fb.group({
      startDateTime: [''],
      endDateTime: [''],
      minCapacity: [0],
      floor: [0],
      keywords: ['']
    });

    this.rooms$ = this.searchSubject.pipe(
      switchMap(searchParams => {
        if (!searchParams) return of([]);

        this.isLoading = true;
        this.error = null;

        return this.searchService.searchRooms(searchParams)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          );
      })
    );

  }

  onSubmit(): void {
    this.searchRoom(this.roomSearchForm.value);
  }

  searchRoom(roomSearch: RoomSearch): void {
    this.searchSubject.next(roomSearch);
  }

  closeSearch() {
    this.resetForm();
    this.toggleVisibility()
  }

  resetForm(): void {
    this.roomSearchForm.reset({
      startDateTime: '',
      endDateTime: '',
      minCapacity: 0,
      floor: 0,
      keywords: ''
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;

  }
}
