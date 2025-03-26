import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-infobar',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './infobar.component.html',
  styleUrl: './infobar.component.scss'
})
export class InfobarComponent {

}
