import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 welcomeMessage = signal('Tere tulemast Broneerimisüsteemi BRuNO!')
}
