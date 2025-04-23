import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {QueryFormComponent} from '../../../room/query-form/query-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-infobar',
  imports: [
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './infobar.component.html',
  styleUrl: './infobar.component.scss'
})
export class InfobarComponent {
  constructor(public dialog: MatDialog) {}

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
