import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html'
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  private login() {
    this.loginService.login(this.userName, this.password);
  }

  // if there is time we can make a logout screen
  public logout() {
    this.loginService.logout();
  }

}
