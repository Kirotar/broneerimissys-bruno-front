import { Component } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import { Observable, BehaviorSubject, switchMap, finalize, of } from 'rxjs';
import {Room, RoomSearch, SearchService} from './search.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private searchSubject = new BehaviorSubject<RoomSearch | null>(null);

  rooms$: Observable<Room[]>;
  isLoading = false;
  error: string | null = null;

  searchData: RoomSearch = {
    startDateTime: '',
    endDateTime: '',
    minCapacity: 0,
    floor: 0,
    keywords: ''
  };

  constructor(private searchService: SearchService) {
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
      this.searchRoom(this.searchData);
  }

  searchRoom(roomSearch: RoomSearch): void {
    this.searchSubject.next(roomSearch);
  }
}
