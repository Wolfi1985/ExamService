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
    this.url = 'http://localhost:8080';

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json;',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {
  }

  public fetchData(url: string, callback: Function) {
    this.http
      .get(this.url + '/getAllExams/', this.options)
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
    this.http
      .post(this.url + '/updateExam/', exam, this.options)
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
    this.http
      .put(this.url + '/addExam/', exam, this.options)
      .toPromise()
      .then(
        res => {
          console.log(res.json());
        }
      )
      .catch(this.handleError);
  }
  public deleteExam(exam: Exam) {
    this.http
      .put(this.url + '/deleteExam/' + exam.examId, this.options)
      .toPromise()
      .then(
        res => {
          console.log(res.json());
        }
      )
      .catch(this.handleError);
  }

}
