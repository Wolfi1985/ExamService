import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Exam } from '../../model/exam';

@Injectable()
export class AdminService implements OnInit {
  headers: Headers;
  options: RequestOptions;

  private url: string;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {
    this.url = 'http://localhost:8080/api/';
  }

  public fetchData(url: string, callback: Function) {
    this.http
      .get(url, this.options)
      .toPromise()
      .then(
        res => {
          callback(res.json());
        }
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public saveChanges(exam: Exam) {
    console.log('ToDo: update exam in Database! + this.currentExam');
    this.http
      .post(this.url + 'changeExam', this.options)
      .toPromise()
      .then(
        res => {
          console.log(res.json());
          console.log('ToDo: show success');
        }
      )
      .catch(this.handleError);
  }

  public addNewExam(exam: Exam) {
    console.log('ToDo: persist new Exam in Database! + this.examToAdd');
    this.http
      .put(this.url + 'addExam', this.options)
      .toPromise()
      .then(
        res => {
          console.log(res.json());
        }
      )
      .catch(this.handleError);
  }

}
