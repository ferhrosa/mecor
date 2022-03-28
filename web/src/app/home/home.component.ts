import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: User;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.getCurrent().subscribe(user => {
      this.user = user;
    });
  }

  logIn() {
  }

  logOut() {
    location.href = `${environment.cleanedApiBaseUrl}/Identity/Account/Logout`;
  }

}
