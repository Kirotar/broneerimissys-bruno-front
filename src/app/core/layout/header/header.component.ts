import {Component, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 welcomeMessage = signal('Tere tulemast Broneerimisüsteemi BRuNO!')

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
