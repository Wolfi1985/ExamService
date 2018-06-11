import { Component, OnInit } from '@angular/core';
import { Exam } from '../../model/exam';
import { ExamService } from '../services/exam.service';
import { LoginService } from '../../login/services/login.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-exam',
  templateUrl: '../views/exam.component.html'
})
export class ExamComponent implements OnInit {

  public exams: Exam[] = [];
  public currentExam: Exam;
  public count = 2;
  public user: User;

  constructor(private examService: ExamService, private loginService: LoginService) {

    this.user = this.loginService.getUser();
  }

  ngOnInit() {
    // patch to API after backend is finished
    this.examService.fetchData((exams) => this.fetchDataDone(exams));
  }

  fetchDataDone(exams: any) {
    this.exams = exams;
    this.setCurrentDetail(this.exams[0]);  // initially set to first element
    this.setIsParticipating();
  }
  setIsParticipating() {
    this.exams.forEach(e => {
      console.log(e);
      e.participants.forEach(p => {
        console.log(p);
      });
    });
  }

  setCurrentDetail(currentExam: any) {
    this.currentExam = currentExam;
    // console.log(currentExam);
  }

  setActive(examId: string) {
    if (examId === this.currentExam.examId) {
      return false;
    } else {
      return false;
    }
  }
  subscribe(exam: Exam) {
    exam.subscribe = true;
    this.examService.subscribe(exam.examId, (exams) => this.fetchDataDone(exams));
  }
  unsubscribe(exam: Exam) {
    exam.subscribe = false;
    this.examService.unsubscribe(exam.examId, (exams) => this.fetchDataDone(exams));
  }
}
