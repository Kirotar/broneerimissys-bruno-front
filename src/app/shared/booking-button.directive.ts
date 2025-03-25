import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Booking} from '../features/home/components/main-calendar/main-calendar.component';

@Directive({
  selector: '[appBookingButton]'
})
export class BookingButtonDirective {
  @Input() bookingRoute: string = '/booking';
  @Input() bookings: Booking[] = [];

  constructor(private router: Router) {
  }

  @HostListener('click')
  navigateToBooking() {
    const bookingsArray = this.bookings;
    if (bookingsArray.length > 0) {
      this.router.navigate([this.bookingRoute], {
        queryParams: {
          bookings: JSON.stringify(bookingsArray)
        }
      });
    }
  }
}
