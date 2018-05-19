import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  public name: string;

  constructor() {
    this.isLoggedIn = true;
    this.name = 'Stefan Mayr';
  }
}
