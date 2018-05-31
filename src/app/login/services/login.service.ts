import { Injectable, } from '@angular/core';
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

  private isLoggedIn: boolean;
  private user: User;

  private subject = new Subject<any>();

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
    this.isLoggedIn = false;
    // this.firstName = 'John';  // default
    // this.surName = 'Doe'; // default
    this.user = new User(); // user that is logged in

    this.errorMessageSubject = new Subject<String>();
    this.errorMessages = this.errorMessageSubject.asObservable();

    this.successMessageSubject = new Subject<String>();
    this.successMessages = this.successMessageSubject.asObservable();

    this.url = 'assets/mockingData/person-mocking-data.json';

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.params = new HttpParams();
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
    this.params.set('userName', userName);
    this.params.set('password', password);

    this.options = new RequestOptions({ headers: this.headers, params: this.params });
    this.getUserData();
  }

  public logout() {
    this.setIsLoggedIn(false);
    this.subject.next({ login: false, user: this.user });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  public getUserData() {
    console.log(this.options.headers);
    console.log(this.options.params);
    this.http
      .get(this.url, this.options)
      .toPromise()
      .then(
        res => {
          console.log(res.json());  // ToDo load user Data and save to variable user
          const user = res.json();
          console.log('ToDo: check if User exists in DB');
          // set userData
          this.user.firstName = user.firstName;
          this.user.surName = user.surName;
          this.user.isFemale = user.isFemale;
          this.user.isStudent = user.isStudent;
          this.setIsLoggedIn(true);
          this.subject.next({ login: true, user: this.user });
          this.router.navigateByUrl('/StartMenu');
        }
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this.setIsLoggedIn(false);
    this.subject.next({ login: false, user: this.user });
    return Promise.reject(error.message || error);
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
