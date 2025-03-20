import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get(`${this.apiUrl}rooms/all`).pipe(
      catchError(error => {
        console.error('Error ruumide laadimisel:', error);
        return throwError(() => new Error('Ei saanud ruume laadida. Proovi hiljem uuesti.'));
      })
    );
  }

searchRoom() {
    return this.http.get(`${this.apiUrl}rooms/search/`);
  }

}
