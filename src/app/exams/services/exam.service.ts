import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Exam } from '../../model/exam';
import { User } from '../../model/user';
import { LoginService } from '../../login/services/login.service';

@Injectable()
export class ExamService implements OnInit {

  headers: Headers;
  options: RequestOptions;

  private url: string;

  private user: User;

  constructor(private http: Http, private loginService: LoginService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json;'
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.user = this.loginService.getUser();
    console.log(this.user);
    this.url = 'http://localhost:8080';
  }

  ngOnInit() {
  }

  public fetchData(callback: Function) {
    this.http
      .get(this.url + '/getAllStudentsExams/?mkNumber=' + this.user.mkNumber, this.options)
      .toPromise()
      .then(
        res => {
          // console.log(res.json());
          callback(res.json());
        }
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  public subscribe(examId: string, callback: Function) {
    this.http
      .post(this.url + '/subscribe/?mkNumber=' + this.user.mkNumber + '&examId=' + examId, JSON.stringify(this.user.mkNumber), this.options)
      .toPromise()
      .then(
        res => {
          const data = res.json();
          console.log(res);
          callback(data);
        }
      )
      .catch(this.handleError);
  }
  public unsubscribe(examId: string, callback: Function) {
    this.http
      .post(this.url + '/unsubscribe/?mkNumber=' + this.user.mkNumber + '&examId=' + examId, JSON.stringify(this.user.mkNumber), this.options)
      .toPromise()
      .then(
        res => {
          const data = res.json();
          console.log(res);
          callback(data);
        }
      )
      .catch(this.handleError);
  }

}
