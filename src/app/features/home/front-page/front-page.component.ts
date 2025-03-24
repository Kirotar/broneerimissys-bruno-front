import { Component } from '@angular/core';
import {InfobarComponent} from "../components/infobar/infobar.component";
import {RoomsComponent} from "../components/rooms/rooms.component";
import {SearchComponent} from "../components/search/search.component";
import {MainCalendarComponent} from '../components/main-calendar/main-calendar.component';

@Component({
  selector: 'app-front-page',
    imports: [
        InfobarComponent,
        RoomsComponent,
        SearchComponent,
        MainCalendarComponent
    ],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {

}
