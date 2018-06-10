import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../login/services/login.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-start-menu',
  templateUrl: '../views/start-menu.component.html'
})
export class StartMenuComponent implements OnInit {

  public user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

}
