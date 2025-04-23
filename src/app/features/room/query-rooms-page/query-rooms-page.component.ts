import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Room} from '../../home/components/search/search.service';
import { ApiService} from '../../../core/services/api.service';
import {QueryFormComponent} from '../query-form/query-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-query-rooms-page',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './query-rooms-page.component.html',
  styleUrls: ['./query-rooms-page.component.scss', '../styles.scss']
})
export class QueryRoomsPageComponent {
  rooms: Room[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchQueryRooms();
  }

  fetchQueryRooms(){
    this.apiService.getQueryRooms().subscribe({
      next: (data:any) => this.rooms = data,
      error: (error) => this.errorMessage = error.message
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(QueryFormComponent, {
      width: '1000px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Form was closed with result:', result);
    });
  }
}
