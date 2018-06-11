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
      'Accept': 'application/json;'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {
  }

  public fetchData(callback: Function) {
    this.http
      .get(this.url + '/getAllExams/', this.options)
      .toPromise()
      .then(
        res => {
          const data = res.json();
          console.log('data fetched');
          callback(data);
        }
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public saveChanges(exam: Exam, callback: Function) {
    const completed = this.http
      .put(this.url + '/exam/', JSON.stringify(exam), this.options)
      .toPromise();

    completed.then(
      res => {
        console.log(res);
        console.log('ToDo: show success');
        const data = res.json();
        callback(data);
      }
    )
      .catch(this.handleError);
  }

  public addNewExam(exam: Exam, callback: Function) {
    this.http
      .post(this.url + '/exam/', JSON.stringify(exam), this.options)
      .toPromise()
      .then(
        res => {
          console.log(res);
          const data = res.json();
          callback(data);
        }
      )
      .catch(this.handleError);
  }
  public deleteExam(exam: Exam, callback: Function) {
    console.log();
    this.http
      .delete(this.url + '/exam/' + exam.examId, this.options)
      .toPromise()
      .then(
        res => {
          console.log(res);
          const data = res.json();
          callback(data);
        }
      )
      .catch(this.handleError);
  }

}
