import { Component } from '@angular/core';
import {CalendarComponent} from "../calendar/calendar.component";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {InfobarComponent} from "../infobar/infobar.component";
import {RoomsComponent} from "../rooms/rooms.component";
import {SearchComponent} from "../search/search.component";
import {MainCalendarComponent} from '../main-calendar/main-calendar.component';

@Component({
  selector: 'app-front-page',
    imports: [
        CalendarComponent,
        FooterComponent,
        HeaderComponent,
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
