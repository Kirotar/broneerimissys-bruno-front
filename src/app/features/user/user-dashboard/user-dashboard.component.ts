import { Component } from '@angular/core';
import { UserService} from '../user.service';
import { User} from '../user.model';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  user: User | null = null;
  showPasswordFields: boolean = true;

  constructor (private userService: UserService) {}

  ngOnInit() {
    this.fetchUserInfo();
  }

   fetchUserInfo(){
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
}

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
  }

}
