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
import {BookingTimerComponent} from '../booking-timer/booking-timer.component';
import {QueryFormComponent} from '../../room/query-form/query-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-booking-page',
  imports: [
    FormsModule,
    MainCalendarComponent,
    DatePipe,
    BookingTimerComponent
  ],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss', '../../../../../styles.scss']
})
export class BookingPageComponent implements OnInit{
  bookings: Booking[] = [];
  user: User | null = null;
  status: Boolean | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService, private bookingService: BookingService,
              private bookingTransferService: BookingTransferService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.bookings = this.bookingTransferService.getBookings();
    this.fetchUserInfo();
  }


  fetchUserInfo(){
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
  }

  onSubmitPay() {
    const transactionRef: string | undefined = this.bookings[0].transactionRef;

    this.checkBookingLimit();

    this.bookingService.payForBooking(transactionRef).subscribe((paymentSuccess: boolean) => {
      this.status = paymentSuccess;

      if (paymentSuccess) {
        this.bookingService.getPinForBooking(transactionRef).subscribe((pin: number) => {
          const updatedBookings = this.bookings.map(booking => ({
            ...booking,
            pin: pin
          }));

          this.bookingTransferService.setBookings(updatedBookings);

          this.router.navigate(['/confirmation']);
        });
      } else {
        this.router.navigate(['/payment-failed']);
      }
    });
  }

  checkBookingLimit(){
    this.userService.fetchAllUserBookings().subscribe(existingBookings => {
      const activeBookings = existingBookings.filter(booking => {
        const endTime = new Date(booking.endTime);
        return endTime > new Date();
      });

      const totalActiveBookings = activeBookings.length + this.bookings.length;

      if (totalActiveBookings > 10) {
        alert('Korraga saab olla 10 aktiivset broneeringut! Tühista mõni, et jätkata.');
        return;
      }
  });
  }

  deleteBooking(bookingToDelete: any): void {
    this.bookings = this.bookings.filter(booking => booking !== bookingToDelete);
  }

  getTotalPrice(): number {
    return this.bookings.reduce((sum, b) => sum + (b.roomPrice || 0), 0);
  }

  openForm() {
    const dialogRef = this.dialog.open(QueryFormComponent, {
      width: '1000px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Form was closed with result:', result);
    });
  }

}
