import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {SavedBooking} from '../../booking/saved-booking';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [DatePipe],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  user: User | null = null;
  showPasswordFields: boolean = false;
  showExpiredBookings: boolean = false;
  bookings: SavedBooking[] = [];
  currentBookings: SavedBooking[] = [];
  expiredBookings: SavedBooking[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.fetchUserInfo();
    this.fetchAllUserBookings();
  }

  fetchUserInfo() {
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
  }

  fetchAllUserBookings() {
    this.userService.fetchAllUserBookings().subscribe((data: SavedBooking[]) => {
        this.bookings = data;
        this.filterBookings();
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  filterBookings() {
    const now = new Date();

    this.currentBookings = this.bookings.filter(bookings => {
      const endTime = new Date(bookings.endTime);
      return endTime >= now;
    });

    this.expiredBookings = this.bookings.filter(bookings => {
      const endTime = new Date(bookings.endTime);
      return endTime < now;
    });
  }

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
  }

  toggleExpiredBookings() {
    this.showExpiredBookings = !this.showExpiredBookings;
  }
}
