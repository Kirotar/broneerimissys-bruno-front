import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {Booking, MainCalendarComponent} from '../../home/components/main-calendar/main-calendar.component';

@Component({
  selector: 'app-booking-page',
  imports: [
    MainCalendarComponent,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss', '../../../../../styles.scss']
})
export class BookingPageComponent implements OnInit{
  bookings: Booking[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['bookings']) {
        try {
          this.bookings = JSON.parse(params['bookings']);
        } catch (error) {
          console.error('Error parsing bookings:', error);
        }
      }
    });
  }
}
