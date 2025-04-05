import {Injectable} from '@angular/core';
import {Booking} from './booking.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  saveBooking(booking: Booking[]){
    console.log("Sending booking:", booking);
    this.http.post<Booking>(`${this.apiUrl}booking/temp-booking`, booking, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).subscribe(response => {
      console.log("Booking response:", response);
    });
/*
  saveBooking(booking: Booking[]){

    this.http.post<Booking[]>(`${this.apiUrl}booking/temp-booking`, booking);
*/
  }


  payForBooking(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}payment/status`);
  }
}
