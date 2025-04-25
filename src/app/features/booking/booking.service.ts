import {Injectable} from '@angular/core';
import {Booking} from './booking.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {BookingTransferService} from './booking-transfer.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private bookingTransferService: BookingTransferService
  ) {
  }

  saveBooking(booking: Booking[]): Subscription {
    return this.http.post<Booking[]>(`${this.apiUrl}booking/temp-booking`, booking)
      .subscribe((bookingSummaries: Booking[]) => {
        const bookingsWithRef = booking.map(booking => {
          const matchingSummary = bookingSummaries.find(
            summary => summary.roomId === booking.roomId
          );

          return {
            ...booking,
            transactionRef: matchingSummary?.transactionRef,
            roomName: matchingSummary?.roomName,
            roomPrice: matchingSummary?.roomPrice
          };
        });

        this.bookingTransferService.setBookings(bookingsWithRef);

        console.log('Bookings created with summaries:', bookingSummaries);
      });
  }


  payForBooking(transactionRef: string | undefined): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiUrl}payment/status`, transactionRef);
  }

  getPinForBooking(transactionRef: string | undefined ): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}booking/pin/${transactionRef}`);
  }

}
