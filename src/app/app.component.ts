import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from '../app/login/services/login.service';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('errorMsg') errorMessageWindow: ModalWindowComponent;
  @ViewChild('successMsg') successMessageWindow: ModalWindowComponent;

  public isLoggedIn: boolean;
  public user: User;

  private subscription: Subscription;

  public errorMessage: string;
  private errorSubscription: any = null;

  public successMessage: string;
  private successSubscription: any = null;

  constructor(private loginService: LoginService) {

    this.subscription = this.loginService.getMessage().subscribe(message => {
      this.isLoggedIn = message.login;
      this.user = message.user;
      console.log(this.user.firstName + ' ' + this.user.surName);
    });
  }

  ngOnInit() {
    this.loginService.setModalWindows(this.errorMessageWindow, this.successMessageWindow);

    if (this.errorSubscription === null) {
      this.errorSubscription = this.loginService.errorMessages.subscribe((newErrorMsg: string) => {
        this.errorMessage = newErrorMsg;
      });
      this.successSubscription = this.loginService.successMessages.subscribe((newsuccessMsg: string) => {
        this.successMessage = newsuccessMsg;
      });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.errorSubscription !== null) {
      this.errorSubscription = null;
    }
    if (this.successSubscription !== null) {
      this.successSubscription = null;
    }
  }
  public logout() {
    this.loginService.logout();
  }
  public closeError() {
    this.errorMessageWindow.hide();
  }
  public closeSuccess() {
    this.successMessageWindow.hide();
  }
}
