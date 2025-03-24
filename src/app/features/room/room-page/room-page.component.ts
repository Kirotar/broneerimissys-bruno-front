import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-room-page',
  imports: [],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.scss'
})
export class RoomPageComponent {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const roomId = params['id'];
    });
  }

}
