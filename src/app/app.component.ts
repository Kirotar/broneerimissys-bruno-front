import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {SearchComponent} from './components/search/search.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {InfobarComponent} from './components/infobar/infobar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SearchComponent, CalendarComponent, InfobarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bruno-front';
}
