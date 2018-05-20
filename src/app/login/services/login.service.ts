import { Injectable, } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ModalWindowComponent } from '../../modal-window/modal-window.component';

@Injectable()
export class LoginService implements CanActivate {

  private isLoggedIn: boolean;
  private firstName: string;
  private surName: string;

  private subject = new Subject<any>();

  private errorMessageWindow: ModalWindowComponent;

  public errorMessages: Observable<String>;
  private errorMessageSubject: Subject<String>;

  constructor() {
    this.isLoggedIn = false;
    this.firstName = 'John';  // default
    this.surName = 'Doe'; // default

    this.errorMessageSubject = new Subject<String>();
    this.errorMessages = this.errorMessageSubject.asObservable();
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
    // http-get to check if user can log in, e.g. set variable isLoggedIn to true
    this.setIsLoggedIn(true);
    this.subject.next({ login: true, firstName: this.firstName, surName: this.surName });
  }

  public logout() {
    this.setIsLoggedIn(false);
    this.subject.next({ login: false, firstName: this.firstName, surName: this.surName });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // routing guard method
  public canActivate() {

    if (this.isLoggedIn === true) {
      return true;
    } else {
      this.showErrorMessage('Either Username or Password not correct!');
      return false;
    }
  }

  // set Modal Windows
  public setModalWindows(errorMessageWindow: ModalWindowComponent) {
    this.errorMessageWindow = errorMessageWindow;
  }

  public showErrorMessage(errorMsg: string) {
    this.errorMessageWindow.show();
    this.errorMessageSubject.next(errorMsg);
  }

  public hideErrorMessage(errorMsg: string) {
    this.errorMessageWindow.hide();
  }
}
