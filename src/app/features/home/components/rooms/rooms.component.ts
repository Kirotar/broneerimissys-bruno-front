import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {Room} from '../search/search.service';
import { ApiService} from '../../../../core/services/api.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss', '../styles.scss']
})
export class RoomsComponent {
  selectedFloor: number | null = 1;
  rooms: Room[] = [];
  errorMessage: string = '';


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms(){
    this.apiService.getRooms().subscribe({
      next: (data:any) => this.rooms = data,
          error: (error) => this.errorMessage = error.message
    });
  }

  setFloor(floor: number) {
    this.selectedFloor = this.selectedFloor === floor ? null : floor;
  }

  get filteredRooms() {
    return this.rooms.filter(room => room.floor === this.selectedFloor);
  }
}
