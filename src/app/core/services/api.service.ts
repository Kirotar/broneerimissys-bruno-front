import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import { Booking} from '../../features/booking/booking.model';
import {Registration} from '../auth/registration-page/registration-page.component';
import {Login} from '../auth/login-page/login-page.component';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getRooms() {
    return this.http.get(`${this.apiUrl}rooms/all`).pipe(
      catchError(error => {
        console.error('Error ruumide laadimisel:', error);
        return throwError(() => new Error('Ei saanud ruume laadida. Proovi hiljem uuesti.'));
      })
    );
  }

  getQueryRooms(){
    return this.http.get(`${this.apiUrl}rooms/get-query-rooms`).pipe(
      catchError(error => {
        console.error('Error ruumide laadimisel:', error);
        return throwError(() => new Error('Ei saanud ruume laadida. Proovi hiljem uuesti.'));
      })
    );
  }

  getBookableRooms() {
    return this.http.get(`${this.apiUrl}rooms/get-bookable-rooms`).pipe(
      catchError(error => {
        console.error('Error ruumide laadimisel:', error);
        return throwError(() => new Error('Ei saanud ruume laadida. Proovi hiljem uuesti.'));
      })
    );
  }

  checkRoomAvailability (bookingSearch: Booking): Observable<string> {
    let params = new HttpParams()
      .set('roomId', bookingSearch.roomId)
      .set('startTime', bookingSearch.startTime)
      .set('endTime', bookingSearch.endTime);

    return this.http.get<boolean>(`${this.apiUrl}booking/get-room-availability`, {params}).pipe(
      map(available => (available ? 'available' : 'booked')),
      catchError(error => {
        console.error('Error saadavuse laadimisel:', error);
        return of('booked');
      })
    );
  }

searchRoom() {
    return this.http.get(`${this.apiUrl}rooms/search/`).pipe(
      catchError(error => {
        console.error('Error ruumide otsimisel:', error);
        return throwError(() => new Error('Ei saanud ruume laadida. Proovi hiljem uuesti.'));
      })
    );
  }

  registerUser(registration: Registration) {
    this.http.post<{ token: string }>(`${this.apiUrl}auth/register`, registration).subscribe({
      next: (response) => {
        const token = response.token;
        localStorage.setItem('jwt', token);
        console.log('Registration successful!');
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }



  login(request: Login): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}auth/login`, request).pipe(
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error('Sisselogimine ebaõnnestus. Kontrolli oma andmeid.'));
      })
    );
  }
}
