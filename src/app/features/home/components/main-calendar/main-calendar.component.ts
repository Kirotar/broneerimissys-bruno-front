import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Room} from '../search/search.service';
import {ApiService} from '../../../../core/services/api.service';
import {BookingButtonDirective} from '../../../../shared/booking-button.directive';

export interface Booking {
  roomId: number;
  startTime: string;
  endTime: string;
  userId?: number;
}

//export type BookingSearch = Omit<Booking, "userId">;
export type BookingMap = Omit<Booking, "roomId">;

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
  loading = false;
  error = '';
  selectedSlot: Set<string> = new Set;
  roomBookings: Map<number, BookingMap[]> = new Map([]);
  bookings: Booking[] = [];

  constructor(private apiService: ApiService) {
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

        const bookingSearch: Booking = {
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

  bookRoom() {
    this.roomBookings.clear();

    this.selectedSlot.forEach(slot => {
      const [roomId, dateTime] = slot.split('--').map(String);
      console.log(dateTime);
      if (!this.roomBookings.has(Number(roomId))) {
        this.roomBookings.set(Number(roomId), []);
      }
      const startTime = new Date(dateTime);
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      this.roomBookings.get(Number(roomId))?.push({ startTime: startTime.toISOString(), endTime: endTime.toISOString()});
    });

    this.roomBookings.forEach((bookingArray, roomId) => {
      bookingArray.sort((a, b) => a.startTime.localeCompare(b.startTime));

      let start = bookingArray[0].startTime;
      let end = bookingArray[0].endTime;

      for (let i = 1; i < bookingArray.length; i++) {
        if (bookingArray[i].startTime === end) {
          end = bookingArray[i].endTime;
        } else {
          this.bookings.push({roomId, startTime: start, endTime: end});
          start = bookingArray[i].startTime;
          end = bookingArray[i].endTime;
        }
      }
      this.bookings.push({roomId, startTime: start, endTime: end});
    });

    if (this.bookings.length === 0) {
      alert("Ühtegi aega pole valitud!");
      return;
    }
  }


  getSlotAvailability(roomId: number, hour: number): string {
    const key = `${roomId}-${hour}`;
    return this.timeSlotAvailability[key];
  }

  selectSlot(roomId: number, hour: number) {
    const dateTime = this.createDateTimeString(this.currentDate, hour);
    const key = `${roomId}--${dateTime}`;
    if (this.selectedSlot.has(key)) {
      this.selectedSlot.delete(key);
    } else {
      this.selectedSlot.add(key);
    }
    console.log(key);
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
