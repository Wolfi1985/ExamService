import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Exam } from '../../model/exam';

@Injectable()
export class ExamService implements OnInit {

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

}
