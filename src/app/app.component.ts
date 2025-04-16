import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import {HeaderTextService} from './core/services/header.text.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bruno-front';

  constructor(private router: Router, private textService: HeaderTextService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentUrl = (event as NavigationEnd).urlAfterRedirects;

        if (currentUrl.includes('dashboard')) {
          this.textService.setText('Minu andmed ja broneeringud');
        } else if (currentUrl.includes('confirmation')) {
          this.textService.setText('Broneering kinnitatud!');
        } else if (currentUrl.includes('failed')) {
          this.textService.setText('Broneering ebaõnnestus!');
        } else if (currentUrl.includes('booking')) {
          this.textService.setText('Sinu broneering:');
        } else {
          this.textService.setText('Tere tulemast broneerimisüsteemi BRuNO!');
        }
      });
  }
}
