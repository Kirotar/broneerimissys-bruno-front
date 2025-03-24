import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './core/layout/header/header.component';
import {SearchComponent} from './features/home/components/search/search.component';
import {InfobarComponent} from './features/home/components/infobar/infobar.component';
import {FooterComponent} from './core/layout/footer/footer.component';
import {RoomsComponent} from './features/home/components/rooms/rooms.component';
import {MainCalendarComponent} from './features/home/components/main-calendar/main-calendar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bruno-front';
}
