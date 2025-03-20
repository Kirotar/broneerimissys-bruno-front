import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import {environment} from '../../environments/environment';

export interface Room {
  id: number;
  roomName: string;
  roomNumber: string;
  capacity: number;
  floor: number;
  equipment: string;
  price: string;
  keywords: string;
}

export interface RoomSearch {
  startDateTime: string;
  endDateTime: string;
  minCapacity: number;
  floor: number;
  keywords: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchRooms(roomSearch: RoomSearch): Observable<Room[]> {
    let params = new HttpParams();

    if (roomSearch.startDateTime) {
      params = params.set('startDateTime', roomSearch.startDateTime)
    }
    if (roomSearch.endDateTime) {
      params = params.set('endDateTime', roomSearch.endDateTime)
    }
    if (roomSearch.minCapacity) {
      params = params.set('minCapacity', roomSearch.minCapacity.toString());
    }
    if (roomSearch.floor) {
      params = params.set('floor', roomSearch.floor.toString());
    }
    if (roomSearch.keywords) {
      params = params.set('keywords', roomSearch.keywords);
    }

    return this.http.get<Room[]>(`${this.apiUrl}rooms/search`, { params })
      .pipe(
        catchError(error => {
          console.error('Error searching for rooms:', error);
          return of([]);
        })
      );
  }
}
