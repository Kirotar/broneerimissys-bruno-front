import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Booking} from '../features/booking/booking.model';
import {BookingService} from '../features/booking/booking.service';
import {BookingTransferService} from '../features/booking/booking-transfer.service';

@Directive({
  selector: '[appBookingButton]'
})
export class BookingButtonDirective {
  @Input() bookingRoute: string = '/booking';
  @Input() bookings: Booking[] = [];

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private bookingTransferService: BookingTransferService
  ) {
  }

  @HostListener('click')
  navigateToBooking() {
    const formattedBookings = this.bookings.map(booking => ({
      roomId: booking.roomId,
      startTime: booking.startTime,
      endTime: booking.endTime
    }));
    console.log(formattedBookings);

    this.bookingService.saveBooking(formattedBookings);
    this.bookingTransferService.setBookings(formattedBookings);

    if (formattedBookings.length > 0) {
      this.router.navigate([this.bookingRoute]);
    }
  }
}

