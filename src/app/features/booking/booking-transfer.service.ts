import {Injectable} from '@angular/core';
import {Booking} from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingTransferService {
  private bookings: Booking[] = [];
  private storageKey = 'bookingData';

  setBookings(bookings: Booking[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(bookings));
  }

  getBookings(): Booking[] {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  clearBookings(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  getTransactionRef(): string | undefined {
      const data = sessionStorage.getItem(this.storageKey);
      if (!data) return undefined;

      const parsed: Booking = JSON.parse(data);
      return parsed.transactionRef;
    }

}
