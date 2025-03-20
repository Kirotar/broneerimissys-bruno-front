import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {SearchComponent} from './components/search/search.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {InfobarComponent} from './components/infobar/infobar.component';
import {FooterComponent} from './components/footer/footer.component';
import {RoomsComponent} from './components/rooms/rooms.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SearchComponent, CalendarComponent, InfobarComponent, FooterComponent, RoomsComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bruno-front';
}
