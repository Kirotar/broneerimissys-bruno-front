import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import { Booking} from '../booking.model';
import {User} from '../../user/user.model';
import {UserService} from '../../user/user.service';
import {FormsModule} from '@angular/forms';
import {BookingService} from '../booking.service';
import {MainCalendarComponent} from '../../home/components/main-calendar/main-calendar.component';

@Component({
  selector: 'app-booking-page',
  imports: [
    RouterLinkActive,
    RouterLink,
    FormsModule,
    MainCalendarComponent
  ],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss', '../../../../../styles.scss']
})
export class BookingPageComponent implements OnInit{
  bookings: Booking[] = [];
  user: User | null = null;
  status: Boolean | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService, private bookingService: BookingService) {}

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

    this.fetchUserInfo();
  }

  fetchUserInfo(){
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
  }
  onSubmitPay(){
    this.bookingService.payForBooking().subscribe((data: Boolean) => {
      this.status = data;
    });

  }

}
