import {Component, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../auth/auth.service';
import {User} from '../../../features/user/user.model';
import {UserService} from '../../../features/user/user.service';
import {HeaderTextService} from '../../services/header.text.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: User | null = null;
  text!: () => string;

  constructor(public authService: AuthService, private router: Router,
              private userService: UserService, private headerTextService: HeaderTextService) {}

  ngOnInit() {
    this.fetchUserInfo();
    this.text = this.headerTextService.text;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  fetchUserInfo(){
    this.userService.fetchUserInfo().subscribe((data: User) => {
      this.user = data;
    });
}
}
