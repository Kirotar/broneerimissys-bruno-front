import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Booking} from '../features/booking/booking.model';
import {BookingService} from '../features/booking/booking.service';

@Directive({
  selector: '[appBookingButton]'
})
export class BookingButtonDirective {
  @Input() bookingRoute: string = '/booking';
  @Input() bookings: Booking[] = [];

  constructor(private router: Router, private bookingService: BookingService) {
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

    if (formattedBookings.length > 0) {
      this.router.navigate([this.bookingRoute], {
        queryParams: {
          bookings: JSON.stringify(formattedBookings)
        }
      });
    }
  }
}
