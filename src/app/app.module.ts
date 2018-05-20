import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// app-component => root component
import { AppComponent } from './app.component';

// components
import { LoginComponent } from './login/components/login.component';
import { AdminComponent } from './admin/components/admin.component';
import { ExamComponent } from './exams/components/exam.component';
import { StartMenuComponent } from './menu/components/start-menu.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';


// services
import { AdminService } from './admin/services/admin.service';
import { LoginService } from './login/services/login.service';
import { StartMenuService } from './menu/services/start-menu.service';

import { AppRoutingModule } from './app.router.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ExamComponent,
    StartMenuComponent,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AdminService,
    LoginService,
    StartMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
