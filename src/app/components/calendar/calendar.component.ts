// calendar.component.ts
import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, switchMap} from 'rxjs';
import {Room} from '../search/search.service';
import {environment} from '../../environments/environment';

export interface BookingSearch {
  roomId: number;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  rooms: Room[] = [];
  currentDate = new Date();
  selectedDate: Date = new Date();
  maxDate = new Date();
  hours: number[] = [];
  loading = false;
  error = '';
  selectedFloor: number = 1;
  timeSlotAvailability: { [key: string]: string } = {};

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.maxDate.setMonth(this.maxDate.getMonth() + 2);

    for (let i = 8; i <= 20; i++) {
      this.hours.push(i);
    }
  }

  ngOnInit() {
    this.fetchRooms();
  }

  loadRoomAvailability() {
    // For each room and timeslot combination
    console.log("combining")

    this.rooms.forEach(room => {
      this.hours.forEach(hour => {
        const key = `${room.id}-${hour}`;
        const startTime = this.createDateTimeString(this.selectedDate, hour);
        const endTime = this.createDateTimeString(this.selectedDate, hour + 1);


        const bookingSearch = {
          roomId: room.id,
          startTime: startTime,
          endTime: endTime
        };
        this.isRoomBookable(room.id).subscribe(status => {
          this.timeSlotAvailability [key] = 'disabled';
        })
        this.isSlotAvailable(bookingSearch).subscribe(status => {
          this.timeSlotAvailability[key] = status;
        });
      });
    });
  }

  isRoomBookable(roomId: number): Observable<boolean> {
    console.log("Checking: is bookable")
    return this.http.get<boolean>(`${this.apiUrl}rooms/is-bookable/${roomId}`)
      .pipe(
        catchError(error => {
          console.error('Error checking if room can be booked:', error);
          return of(false);
        })
      );
  }

  onDateChange(newDate: Date) {
    this.selectedDate = newDate;
    this.loadRoomAvailability();
  }

  createDateTimeString(date: Date, hour: number): string {
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    return newDate.toISOString();
  }

  getSlotAvailability(roomId: number, hour: number): string {
    const key = `${roomId}-${hour}`;
    return this.timeSlotAvailability[key];
  }


  fetchRooms() {
    this.loading = true;
    this.error = '';
    console.log("fetching rooms")

    this.http.get<Room[]>(`${this.apiUrl}rooms/all`)
      .pipe(
        catchError(error => {
          console.error('Error fetching rooms:', error);
          this.error = 'Failed to load rooms. Please try again later.';
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.rooms = data;
          this.loading = false;
          this.loadRoomAvailability();
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to load rooms. Please try again later.';
          console.error('Error fetching rooms:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });


  }


  goToNextDay() {
    const nextDay = new Date(this.currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    if (nextDay <= this.maxDate) {
      this.currentDate = nextDay;
    }
  }


  goToPreviousDay() {
    const prevDay = new Date(this.currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (prevDay >= today) {
      this.currentDate = prevDay;
    }
  }


  isSlotAvailable(bookingSearch: BookingSearch): Observable<string> {
    console.log("searching availability")
    return this.isRoomBookable(bookingSearch.roomId).pipe(
      switchMap(isBookable => {
        if (!isBookable) {
          return of('disabled');
        }

        let params = new HttpParams();
        params = params.set('roomId', bookingSearch.roomId)
        params = params.set('startDateTime', bookingSearch.startTime)
        params = params.set('endDateTime', bookingSearch.endTime)

        return this.http.get<boolean>(`${this.apiUrl}booking/get-room-availability`, {params}).pipe(
          map(available => available ? 'available' : 'booked'),
          catchError(error => {
            console.error('Error checking room availability:', error);
            return of('booked');
          })
        );
      })
    );
  }


  bookSlot(roomId: number, hour: number) {
    console.log(`Booking room ${roomId} at ${hour}:00`);
    // Implement your booking logic here
  }


  formatDate(date: Date) {
    return date.toLocaleDateString('et-EE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isSameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }


  isCurrentDateToday() {
    return this.isSameDay(this.currentDate, new Date());
  }


  isMaxDate() {
    return this.isSameDay(this.currentDate, this.maxDate);
  }

  get filteredRooms() {
    return this.rooms.filter(room => room.floor === this.selectedFloor);
  }

  setFloor(floor: number) {
    this.selectedFloor = floor;
  }
}
