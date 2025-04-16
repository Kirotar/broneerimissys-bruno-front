import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Booking} from '../booking.model';
import {User} from '../../user/user.model';
import {UserService} from '../../user/user.service';
import {FormsModule} from '@angular/forms';
import {BookingService} from '../booking.service';
import {MainCalendarComponent} from '../../home/components/main-calendar/main-calendar.component';
import {BookingTransferService} from '../booking-transfer.service';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  imports: [

    FormsModule,
    MainCalendarComponent,
    DatePipe
  ],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss', '../../../../../styles.scss']
})
export class BookingPageComponent implements OnInit{
  bookings: Booking[] = [];
  user: User | null = null;
  status: Boolean | undefined;
  bookingsStringified: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private bookingService: BookingService,
              private bookingTransferService: BookingTransferService, private router: Router) {}

  ngOnInit() {
    this.bookings = this.bookingTransferService.getBookings();
    this.fetchUserInfo();
  }


  fetchUserInfo(){
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
  }
  onSubmitPay(){
    this.bookingService.payForBooking(this.bookings).subscribe((data: boolean) => {
      this.status = data;
      if (data === true) {
        this.router.navigate(['/confirmation'], {
          queryParams: { bookings: this.bookingsStringified }
        });
      } else {
        this.router.navigate(['/payment-failed'], {
          queryParams: { bookings: this.bookingsStringified }
        });
      }
    });
  }

}
