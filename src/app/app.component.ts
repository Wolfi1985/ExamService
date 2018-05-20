import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from '../app/login/services/login.service';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('errorMsg') errorMessageWindow: ModalWindowComponent;

  public isLoggedIn: boolean;
  public firstName: string;
  public surName: string;

  private subscription: Subscription;

  public errorMessage: string;
  private errorSubscription: any = null;

  constructor(private loginService: LoginService) {

    this.subscription = this.loginService.getMessage().subscribe(message => {
      this.isLoggedIn = message.login;
      this.firstName = message.firstName;
      this.surName = message.surName;
      // console.log(this.firstName + ' ' + this.surName);
    });
  }

  ngOnInit() {
    this.loginService.setModalWindows(this.errorMessageWindow);

    if (this.errorSubscription === null) {
      this.errorSubscription = this.loginService.errorMessages.subscribe((newErrorMsg: string) => {
        this.errorMessage = newErrorMsg;
      });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.errorSubscription !== null) {
      this.errorSubscription = null;
    }
  }
  public logout() {
    this.loginService.logout();
  }
  public close() {
    this.errorMessageWindow.hide();
  }
}
