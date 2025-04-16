import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { User} from './user.model';
import {Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SavedBooking} from '../booking/saved-booking';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  fetchUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}user/info`);
  }

  fetchAllUserBookings(): Observable<SavedBooking[]>{
    return this.http.get<SavedBooking[]>(`${this.apiUrl}user/my-bookings`).pipe(
      catchError(err => {
        console.error('API error:', err);
        return throwError(err);
      })
    );
  }

}
