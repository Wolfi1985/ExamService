import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// app-component => root component
import { AppComponent } from './app.component';

// components
import { LoginComponent } from './login/components/login.component';
import { MainComponent } from './main/components/main.component';

// services
import { MainService } from './main/services/main.service';
import { LoginService } from './login/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MainService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
