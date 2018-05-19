import { Injectable, } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable()
export class LoginService implements CanActivate {

  private isLoggedIn: boolean;

  constructor(
  ) {

    this.isLoggedIn = false;
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  public setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  // ToDo
  public login(userName: string, password: string) {
    console.log(userName + ' ' + password);
    // http-get to check if user can log in in, e.g. set variable isLoggedIn to true
    this.setIsLoggedIn(true);
  }

  // routing guard method
  public canActivate() {

    if (this.isLoggedIn === true) {
      return true;
    } else {
      // show error message instead of alert
      alert('Either Username or Password not correct!');
      return false;
    }
  }

}
