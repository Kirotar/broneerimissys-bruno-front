import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Room} from '../search/search.service';
import {ApiService} from '../../../../core/services/api.service';
import {BookingButtonDirective} from '../../../../shared/booking-button.directive';
import {Booking} from '../../../booking/booking.model';
import {DateTimeUtilsService} from '../../../../shared/date-time.utils.service';
import {RouterLink, RouterLinkActive} from "@angular/router";

export type BookingMap = Omit<Booking, "roomId">;

@Component({
  selector: 'app-main-calendar',
  standalone: true,
  imports: [CommonModule, BookingButtonDirective, RouterLinkActive, RouterLink],
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss', '../styles.scss']
})
export class MainCalendarComponent implements OnInit {
  // Data properties
  rooms: Room[] = [];
  bookings: Booking[] = [];

  // Time-related properties
  currentDate = new Date();
  maxDate = new Date();
  hours: number[] = [];

  // UI state properties
  selectedFloor: number = 2;
  timeSlotAvailability: { [key: string]: string } = {};
  selectedSlot: Set<string> = new Set();
  maxBookings: number = 10;

  // Status flags
  loading = false;
  error = '';

  roomBookings: Map<number, BookingMap[]> = new Map([]);
  isVisible: boolean | undefined;

  constructor(private apiService: ApiService, protected dateTimeUtils: DateTimeUtilsService) {
    this.initializeDates();
    this.initializeHours();
  }

  private initializeDates(): void {
    this.maxDate.setMonth(this.maxDate.getMonth() + 2);
  }

  private initializeHours(): void {
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
        const startTime = this.dateTimeUtils.createDateTimeString(this.currentDate, hour);
        const endTime = this.dateTimeUtils.createDateTimeString(this.currentDate, hour + 1);

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
    this.bookings = [];
    this.roomBookings.clear();

    this.selectedSlot.forEach(slot => {
      const [roomId, dateTime] = slot.split('--').map(String);
      if (!this.roomBookings.has(Number(roomId))) {
        this.roomBookings.set(Number(roomId), []);
      }
      const startTime = new Date(dateTime);
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      this.roomBookings.get(Number(roomId))?.push({startTime: startTime.toISOString(), endTime: endTime.toISOString()});
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

    if (this.bookings.length >= this.maxBookings) {
      alert("Üle kümne broneeringu ei saa teha!");
      return;
    }
    this.isVisible=true;
  }


  getSlotAvailability(roomId: number, hour: number): string {
    const key = `${roomId}-${hour}`;
    return this.timeSlotAvailability[key];
  }

  selectSlot(roomId: number, hour: number) {
        const dateTime = this.dateTimeUtils.createDateTimeString(this.currentDate, hour);
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
    return this.dateTimeUtils.formatDate(date);
  }

  isCurrentDateToday(): boolean {
    return this.dateTimeUtils.isSameDay(this.currentDate, new Date());
  }

  isMaxDate(): boolean {
    return this.dateTimeUtils.isSameDay(this.currentDate, this.maxDate);
  }

  setFloor(floor: number) {
    this.selectedFloor = floor;
  }

  goToNextDay(): void {
    const nextDay = this.dateTimeUtils.getNextDay(this.currentDate);

    if (this.dateTimeUtils.isBeforeOrSameDay(nextDay, this.maxDate)) {
      this.currentDate = nextDay;
      this.loadRoomAvailability();
    }
  }

  goToPreviousDay(): void {
    const prevDay = this.dateTimeUtils.getPreviousDay(this.currentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.dateTimeUtils.isAfterOrSameDay(prevDay, today)) {
      this.currentDate = prevDay;
      this.loadRoomAvailability();
    }
  }
}
