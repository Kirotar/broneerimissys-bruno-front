import { Routes } from '@angular/router';
import { RoomPageComponent } from './components/room-page/room-page.component';

export const routes: Routes = [
  { path: 'room-page-component/:id', component: RoomPageComponent },
];
