import { Component } from '@angular/core';
import { VERSION, BUILD_TIMESTAMP } from '../../../../version';


@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  version = VERSION;
  buildTime = BUILD_TIMESTAMP;

}
