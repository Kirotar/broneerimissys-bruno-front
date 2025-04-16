import { Routes } from '@angular/router';
import { RoomPageComponent } from './features/room/room-page/room-page.component';
import { LoginPageComponent} from './core/auth/login-page/login-page.component';
import {BookingPageComponent} from './features/booking/booking-page/booking-page.component';
import {FrontPageComponent} from './features/home/front-page/front-page.component';
import {RegistrationPageComponent} from './core/auth/registration-page/registration-page.component';
import {ConfirmationPageComponent} from './features/booking/confirmation-page/confirmation-page.component';
import {UserDashboardComponent} from './features/user/user-dashboard/user-dashboard.component';
import {QueryFormComponent} from './features/booking/query-form/query-form.component';
import {PaymentFailedPageComponent} from './features/booking/payment-failed-page/payment-failed-page.component';

export const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'room/:id', component: RoomPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'registration', component: RegistrationPageComponent},
  { path: 'booking', component: BookingPageComponent},
  { path: 'confirmation', component: ConfirmationPageComponent},
  { path: 'payment-failed', component: PaymentFailedPageComponent},
  { path: 'dashboard', component: UserDashboardComponent},
  { path: 'query', component: QueryFormComponent}
];
