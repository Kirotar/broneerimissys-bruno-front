import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainCalendarComponent} from '../../home/components/main-calendar/main-calendar.component';

@Component({
  selector: 'app-booking-page',
  imports: [
    MainCalendarComponent
  ],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss', '../../../../../styles.scss']
})
export class BookingPageComponent implements OnInit{
  roomId!: number;
  startTime!: string;
  endTime!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];

      this.startTime = new Date(this.startTime).toLocaleString();
      this.endTime = new Date(this.endTime).toLocaleString();
    });
  }
}
