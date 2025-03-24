import { Directive, HostListener, Input } from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  selector: '[appBookingButton]'
})
export class BookingButtonDirective {
  @Input() bookingRoute: string = '/booking';
  @Input() roomId!: number;
  @Input() userId?: number;
  @Input() startDateTime!: string;
  @Input() endDateTime!: string;
  constructor(private router: Router) { }

  @HostListener('click')
  navigateToBooking() {
    this.router.navigate([this.bookingRoute], {queryParams: {roomId: this.roomId, userId: this.userId,
        startDateTime: this.startDateTime, endDateTime: this.endDateTime}});
  }
}
