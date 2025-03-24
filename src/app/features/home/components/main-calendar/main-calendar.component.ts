import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Room} from '../search/search.service';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../../core/services/api.service';
import {BookingButtonDirective} from '../../../../shared/booking-button.directive';

export interface BookingSearch {
  roomId: number;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'app-main-calendar',
  standalone: true,
  imports: [CommonModule, BookingButtonDirective],
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss', '../styles.scss']
})
export class MainCalendarComponent implements OnInit {
  rooms: Room[] = [];
  currentDate = new Date();
  maxDate = new Date();
  hours: number[] = [];
  selectedFloor: number = 2;
  timeSlotAvailability: { [key: string]: string } = {};
  selectedSlots: Set<string> = new Set;
  loading = false;
  error = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.maxDate.setMonth(this.maxDate.getMonth() + 2);

    for (let i = 10; i <= 19; i++) {
      this.hours.push(i);
    }
  }

  ngOnInit() {
    this.fetchBookableRooms();
  }

  fetchBookableRooms() {
    this.loading = true;
    this.error = '';

    this.apiService.getBookableRooms().subscribe({
      next: (data: any) => {
        this.rooms = data;
        this.loading = false;
        this.loadRoomAvailability();
      },
      error: (error) => this.error = error.message
    });
  }

  loadRoomAvailability() {
    this.rooms.forEach(room => {
      this.hours.forEach(hour => {
        const key = `${room.id}-${hour}`;
        const startTime = this.createDateTimeString(this.currentDate, hour);
        const endTime = this.createDateTimeString(this.currentDate, hour + 1);

        const bookingSearch: BookingSearch = {
          roomId: room.id,
          startTime: startTime,
          endTime: endTime
        };
        this.apiService.checkRoomAvailability(bookingSearch).subscribe(status => {
          this.timeSlotAvailability[key] = status;
        });
      });
    });
  }

  getSlotAvailability(roomId: number, hour: number): string {
    const key = `${roomId}-${hour}`;
    return this.timeSlotAvailability[key];
  }

  selectSlot(roomId: number, hour: number) {
    const key = `${roomId}-${hour}`;
    if (this.selectedSlots.has(key)) {
      this.selectedSlots.delete(key);
    } else if (!this.selectedSlots.has(key)) {
      this.selectedSlots.add(key);
    }
  }

  get filteredRooms() {
    return this.rooms.filter(room => room.floor === this.selectedFloor);
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

  createDateTimeString(date: Date, hour: number): string {
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    return newDate.toISOString();
  }

  setFloor(floor: number) {
    this.selectedFloor = floor;
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
}
