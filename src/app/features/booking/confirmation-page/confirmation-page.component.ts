import { Component } from '@angular/core';
import {ActivatedRoute, RouterLinkActive} from "@angular/router";
import {User} from '../../user/user.model';
import {UserService} from '../../user/user.service';
import {Booking} from '../booking.model';
import {BookingTransferService} from '../booking-transfer.service';
import {DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-confirmation-page',
  imports: [
    DatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss', '../styles.scss']
})
export class ConfirmationPageComponent {
  user: User | null = null;
  bookings: Booking[] = [];

  constructor (private userService: UserService, private route: ActivatedRoute,
               private bookingTransferService: BookingTransferService) {}

  ngOnInit() {
    this.fetchUserInfo();
    this.bookings = this.bookingTransferService.getBookings();
    this.bookingTransferService.clearBookings();
  }

  fetchUserInfo(){
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
  }


  getTotalPrice() {
    return this.bookings.reduce((sum, b) => sum + (b.roomPrice || 0), 0);
  }
}
