import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking-page',
  imports: [],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss'
})
export class BookingPageComponent {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const roomId = params['id'];
      const startTime = params['start'];
      const endTime = params['end'];
    });
  }
}
