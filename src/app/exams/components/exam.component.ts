import { Component, OnInit } from '@angular/core';
import { Exam } from '../../model/exam';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: '../views/exam.component.html'
})
export class ExamComponent implements OnInit {

  public exams: Exam[] = [];
  public currentExam: Exam;

  constructor(private examService: ExamService) { }

  ngOnInit() {
    // patch to API after backend is finished
    this.examService.fetchData('assets/mockingData/students-enrollment-mocking-data.json', (exams) => this.fetchDataDone(exams));
  }

  fetchDataDone(exams: any) {
    this.exams = exams.enrollments;
    this.setCurrentDetail(this.exams[0]);  // initially set to first element
  }
  setCurrentDetail(currentExam: any) {
    this.currentExam = currentExam;
    console.log(currentExam);
  }

  setActive(examId: string) {
    if (examId === this.currentExam.examId) {
      //return true;
      return false;
    } else {
      return false;
    }
  }
  subscribe(exam: Exam) {
    exam.subscribe = true;
  }
  unsubscribe(exam: Exam) {
    exam.subscribe = false;
  }
}
