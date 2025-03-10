import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get(`${this.apiUrl}/all`);
  }

  searchRoom() {
    return this.http.get(`${this.apiUrl}/search/`);
  }

}
