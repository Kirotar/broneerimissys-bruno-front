import { Routes } from '@angular/router';
import { RoomPageComponent } from './features/room/room-page/room-page.component';
import { LoginPageComponent} from './components/login-page/login-page.component';
import {BookingPageComponent} from './features/booking/booking-page/booking-page.component';
import {FrontPageComponent} from './features/home/front-page/front-page.component';

export const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'room-page/:id', component: RoomPageComponent },
  { path: 'login-page', component: LoginPageComponent},
  { path: 'booking-page', component: BookingPageComponent}
];
