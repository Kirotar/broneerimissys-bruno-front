import { Component } from '@angular/core';
import { VERSION} from '../../../../version';


@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  version = VERSION;

}
