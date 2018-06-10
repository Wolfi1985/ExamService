import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { ModalWindowComponent } from '../../modal-window/modal-window.component';
import { User } from '../../model/user';

@Injectable()
export class LoginService implements CanActivate {

  public isLoggedIn: boolean;
  private user: User;

  private subject: Subject<any>;

  private errorMessageWindow: ModalWindowComponent;
  private successMessageWindow: ModalWindowComponent;

  public errorMessages: Observable<String>;
  private errorMessageSubject: Subject<String>;

  public successMessages: Observable<String>;
  private successMessageSubject: Subject<String>;

  private url: string;
  private params: HttpParams;

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private router: Router) {
    // this.firstName = 'John';  // default
    // this.surName = 'Doe'; // default

    this.isLoggedIn = false;

    this.user = new User(); // user that is logged in

    this.subject = new Subject<any>();

    this.errorMessageSubject = new Subject<String>();
    this.errorMessages = this.errorMessageSubject.asObservable();

    this.successMessageSubject = new Subject<String>();
    this.successMessages = this.successMessageSubject.asObservable();

    this.url = 'http://localhost:8080';

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
  }

  public getUser() {
    return this.user;
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
    this.isLoggedIn = false;
    this.options = new RequestOptions({ headers: this.headers });
    this.getUserData(userName, password);
  }

  public logout() {
    this.isLoggedIn = false;
    this.subject.next({ login: false, user: this.user });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  public getUserData(userName: string, password: string) {
    console.log(this.options.headers);
    // console.log(this.options.params);
    this.http
      .get(this.url + '/user/login?username=' + userName + '&password=' + password, this.options)
      .toPromise()
      .then(
        res => {

          const data = res.json();
          const user = new User();

          console.log(data);  // ToDo load user Data and save to variable user

          // set userData
          this.user.firstName = data.firstName;
          this.user.surName = data.surName;
          this.user.mkNumber = data.mkNumber;
          this.user.isFemale = data.isFemale;
          this.user.isStudent = data.isStudent;
          this.isLoggedIn = true;
          this.subject.next({ login: true, user: this.user });
          this.router.navigateByUrl('/StartMenu');
        }
      )
      .catch((error: Response) => {
        if (error.status === 401) {
          this.showErrorMessage('Your password is not correct!');
        } else if (error.status === 404) {
          this.showErrorMessage('The user does\'t exist!');
        }
        console.error('An error occurred', error);
        this.subject.next({ login: false, user: this.user });
      }
      );
  }

  // routing guard method
  public canActivate() {
    if (this.getIsLoggedIn() === true) {
      return true;
    } else {
      this.showErrorMessage('Either Username or Password not correct!');
      return false;
    }
  }

  // set Modal Windows
  public setModalWindows(errorMessageWindow: ModalWindowComponent, successMessageWindow: ModalWindowComponent) {
    console.log('login first');
    this.errorMessageWindow = errorMessageWindow;
    this.successMessageWindow = successMessageWindow;
  }

  public showErrorMessage(errorMsg: string) {
    this.errorMessageWindow.show();
    this.errorMessageSubject.next(errorMsg);
  }

  public hideErrorMessage(errorMsg: string) {
    this.errorMessageWindow.hide();
  }

  public showSuccessMessage(successMsg: string) {
    this.errorMessageWindow.show();
    this.errorMessageSubject.next(successMsg);
  }

  public hideSuccessMessage(successMsg: string) {
    this.errorMessageWindow.hide();
  }
}
