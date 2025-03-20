import { Routes } from '@angular/router';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { LoginPageComponent} from './components/login-page/login-page.component';

export const routes: Routes = [
  { path: 'room-page/:id', component: RoomPageComponent },
  { path: 'login-page', component: LoginPageComponent}
];
